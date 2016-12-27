module.exports = {
  db: 'mongodb://localhost/mean-book',
  sessionSecret: 'developmentSessionSecret',

  facebook: {
    clientID: '1258643274196214',
    clientSecret: 'bc3cb20a73d61ed8bb239a08e0d597de',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  },

  twitter: {
    clientID: 'op315dRAFDGmf0quFAedZweph',
    clientSecret: 'tM2oTGQDlG3FcRSlCH29SsaaRSMRmuv8hutqBTq6KOjnbIrpz3',
    callbackURL: 'http://localhost:3000/oauth/twitter/callback'
  }
};
