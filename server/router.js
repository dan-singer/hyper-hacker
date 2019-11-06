const controllers = require('./controllers');
const mid = require('./middleware');
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.signup);
  app.get('/logout', mid.redirectHomeIfLoggedOut, controllers.Account.logout);

  app.get('/level-select', mid.requiresSecure, mid.redirectHomeIfLoggedOut, controllers.Account.levelSelectPage);

  app.get('/', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.loginPage);
};
module.exports = router;
