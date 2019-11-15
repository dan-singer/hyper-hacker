const controllers = require('./controllers');
const mid = require('./middleware');
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.login);
  app.get('/tutorial', mid.requiresSecure,
    mid.redirectHomeIfLoggedOut, controllers.Account.tutorialPage);
  app.post('/tutorial', mid.requiresSecure,
    mid.redirectHomeIfLoggedOut, controllers.Account.completeTutorial);
  app.get('/signup', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.signup);
  app.get('/logout', mid.redirectHomeIfLoggedOut, controllers.Account.logout);

  app.post('/update-username', mid.requiresSecure,
    mid.redirectHomeIfLoggedOut, controllers.Account.changeUsername);

  app.get('/level-select', mid.requiresSecure,
    mid.redirectHomeIfLoggedOut, controllers.Account.levelSelectPage);

  app.get('/level', mid.requiresSecure,
    mid.redirectHomeIfLoggedOut, controllers.Account.getLevel);
  app.post('/level', mid.requiresSecure,
    mid.redirectHomeIfLoggedOut, controllers.Account.completeLevel);

  app.get('/help', mid.requiresSecure, mid.redirectHomeIfLoggedOut,
    controllers.Account.getHelp);

  app.get('/', mid.requiresSecure, mid.bypassIfLoggedIn, controllers.Account.loginPage);
};
module.exports = router;
