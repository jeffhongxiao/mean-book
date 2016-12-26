module.exports = {
  db: 'mongodb://localhost/mean-book',
  sessionSecret: 'developmentSessionSecret',

  facebook: {
    clientID: '1258643274196214',
    clientSecret: 'bc3cb20a73d61ed8bb239a08e0d597de',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  },

  twitter: {
    clientID: 'D0JW1e1btRb2wnj8XCmzfofgQ',
    clientSecret: 'faXdo8Zfirak2cri9v2riOf1dO0TAppwOXWBGohF1E14PXdejb',
    callbackURL: 'http://localhost:3000/oauth/twitter/callback'
  }
};
