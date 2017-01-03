var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');


var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
	  index: true,
	  match: [/.+\@.+\..+/, 'Please fill a valid email address' ]	// validator
  },
  username: {
	type: String,
    trim: true,		// modifier
	  unique: true,	// index
	  required: 'Username is required',	// validator
  },

  password: {
    type: String,
  	validate: [ 	// custom validator
  	  function(password) {
  	    return password && password.length >= 6;
  	  }, 'Password need to be longer'
    ],
  },
  salt: {
    type: String,
  },
  provider: {
    type: String,
    required: 'Provider is required',
  },
  providerId: String,
  providerData: {},

  created: {
	  type: Date,
	  default: Date.now
  },

  website: {
  	type: String,
  	set: function(url) { // custom modifier
  	  if (!url) {
  		return url;
  	  }
  	  else {
  		url = 'http://' + url;

  		return url;
  	  }
  	},
  },

});

UserSchema.virtual('fullName')
  .get(function() {
    return this.lastName + ', ' + this.firstName;
  })
  .set(function(fullName) {
    console.log("fullName = " + fullName);
    // if (!fullName) {
    //   fullName = "Hillary Clinton";
    // }
    if (fullName) {
      var splitName = fullName.split(' ');
      this.firstName = splitName[0] || '';
      this.lastName = splitName[1] || '';
    }
  });

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({username: possibleUsername}, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};
UserSchema.statics.findOneByUsername = function(username, callback) {
  this.findOne({ username: new RegExp(username, 'i') }, callback);
};
// To call this static method
//User.findOneByUsername('user name', function(err, user) {
//});

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', UserSchema);
