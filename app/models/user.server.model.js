var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
	index: true,
	match: /.+\@.+\..+/,	// validator
  },
  username: {
	type: String,
    trim: true,		// modifier
	unique: true,	// index
	required: true,	// validator
  },
  password: {
    type: String,
	validate: [ 	// custom validator
	  function(password) {
	  return password.length >= 6; 
	  }, 
	  'Password need to be longer'],
  },
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
	  };
	},
  },

});

mongoose.model('User', UserSchema);

UserSchema.virtual('fullName')
  .get(function() {
    return this.firstName + ' ' + this.lastName;
  });

UserSchema.set('toJSON', { getters: true, setters: true, virtuals: true });

// custom static method
UserSchema.statics.findOneByUsername = function(username, callback) {
  this.findOne({ username: new RegExp(username, 'i') }, callback);
};
// To call this static method
//User.findOneByUsername('user name', function(err, user) {
//});

// custom instance method
UserSchema.methods.authenticate = function(password) {
	return this.password === password;
}
// To call this instance method
//user.authenticate('password');


