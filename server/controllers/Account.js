const models = require('../models');
const fs = require('fs');
// const path = require('path');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const signupPage = (req, res) => {
  res.render('signup', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    res.status(400).json({ error: 'missing-data' });
    return;
  }

  Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      res.status(401).json({ error: 'invalid-credentials' });
      return;
    }

    req.session.account = Account.AccountModel.toAPI(account);

    res.render('level-select', { csrfToken: req.csrfToken() });

    res.status(200).send();
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    res.status(400).json({ error: 'missing-data' });
    return;
  }
  if (req.body.pass !== req.body.pass2) {
    res.status(400).json({ error: 'password-mismatch' });
    return;
  }

  Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };
    const newAccount = new Account.AccountModel(accountData);
    const savePromise = newAccount.save();
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);

      res.render('tutorial', { csrfToken: req.csrfToken() });

      res.status(200).send();
    });
    savePromise.catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({ error: 'username-taken' });
      }
    });
  });
};

const levelSelectPage = (request, response) => {
  fs.readFile(`${__dirname}/../../data/levels.json`, (err, data) => {
    const levels = JSON.parse(data);
    Account.AccountModel.findByUsername(request.session.account.username)
      .then((user) => {
        const date = new Date(user.createdDate);
        const dateJoined = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const levelDetails = {
          username: user.username,
          highscores: user.completionTimes,
          csrfToken: request.csrfToken(),
          levelNames: levels.map(level => level.name),
          dateJoined,
        };
        response.render('level-select', levelDetails);
      });
  });
};

const tutorialPage = (request, response) => {
  const req = request;
  const res = response;
  res.render('tutorial', { csrfToken: req.csrfToken() });
};

const completeTutorial = (request, response) => {
  Account.AccountModel.findByUsername(request.session.account.username)
    .then(user => Account.AccountModel.completeTutorial(user))
    .then(user => {
      response.status(200).send();
    })
    .catch(err => {
      response.status(400).send(err);
    });
};

const getLevel = (request, response) => {
  if (!request.query.num
    || !Account.AccountModel.canAccessLevel(request.session.account._id, request.query.num)) {
    response.redirect('/level-select');
    return;
  }

  Account.AccountModel.findByUsername(request.session.account.username)
  .then(user => {
    user.startTime = Date.now();
    return user.save();
  })
  .then((user) => {
    const date = new Date(user.createdDate);
    const dateJoined = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const levelDetails = {
      username: user.username,
      csrfToken: request.csrfToken(),
      dateJoined,
    };
    response.render(`levels/${request.query.num}`, levelDetails);
  })
  .catch((err) => {
    response.status(400).json({ error: err });
  });
};

const completeLevel = (request, response) => {
  if (!request.query.num
    || !Account.AccountModel.canAccessLevel(request.session.account._id, request.query.num)) {
    response.redirect('/level-select');
    return;
  }

  Account.AccountModel.findByUsername(request.session.account.username)
  .then(user => Account.AccountModel.completeLevel(user, parseInt(request.query.num)))
  .then((user) => {
    response.status(200).send();
  })
  .catch((err) => {
    response.status(400).json({ error: err });
  });
};

module.exports = {
  loginPage, login, logout, signupPage, signup,
  levelSelectPage, tutorialPage, completeTutorial,
  getLevel, completeLevel,
};
