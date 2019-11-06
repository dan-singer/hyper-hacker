const redirectHomeIfLoggedOut = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const bypassIfLoggedIn = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/level-select'); 
  }
  return next();
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
