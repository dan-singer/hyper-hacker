const Models = require('../models');
const Account = Models.Account;

const redirectHomeIfLoggedOut = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const bypassIfLoggedIn = (req, res, next) => {
  if (req.session.account) {
    Account.AccountModel.findByUsername(req.session.account.username)
    .then((user) => {
      if (user.completedTutorial) {
        return res.redirect('/level-select');
      } else {
        return res.redirect('/tutorial');
      }
    })
    .catch((err) => {
      return res.json({error: err});
    });
  }
  else {
    return next();
  }
};

const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};
const bypassSecure = (req, res, next) => {
  next();
};

module.exports.redirectHomeIfLoggedOut = redirectHomeIfLoggedOut;
module.exports.bypassIfLoggedIn = bypassIfLoggedIn;

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
