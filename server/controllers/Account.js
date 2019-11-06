const models = require('../models');
const fs = require("fs");
const path = require('path');

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
    res.status(400).json({'error': 'missing-data'});
    return;
  }

  Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      res.status(401).json({'error': 'invalid-credentials'});
      return;
    }

    req.session.account = Account.AccountModel.toAPI(account);

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

  const levelData = fs.readFile(`${__dirname}/../../data/levels.json`, (err, data) => {
    console.log(err);
    const levels = JSON.parse(data);
    Account.AccountModel.findByUsername(request.session.account.username, (err, user) => {
      const levelDetails = {
        username: user.username,
        highscores: user.completionTimes,
        csrfToken: request.csrfToken(),
        levelNames: levels.map(level => level.name)
      };
      console.dir(levelDetails);
      response.render('level-select', levelDetails);
  
    });
  });



};

module.exports = {
  loginPage, login, logout, signupPage, signup, levelSelectPage
};
