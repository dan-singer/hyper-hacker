const models = require('../models');
const fs = require('fs');
const btoa = require('btoa');
// const path = require('path');

const Account = models.Account;

const getCsrf = (req, res) => {
  res.json({csrfToken: req.csrfToken()});
}

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

    res.redirect('/level-select');
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

      res.redirect('/tutorial');
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
          levels,
          dateJoined,
          isPremium: user.isPremium,
          pictureName: user.name,
          pictureData: user.data,
          pictureSize: user.size,
          pictureEncoding: user.encoding,
          pictureFilePath: user.tempFilePath,
          picturetrunc: user.truncated,
          picturemime: user.mimetype,
          picturemd5: user.md5,
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
    .then(() => {
      response.status(200).send();
    })
    .catch(err => {
      response.status(400).send(err);
    });
};

const getLevel = (request, response) => {
  Account.AccountModel.findByUsername(request.session.account.username)
  .then(user => {
    const userCopy = user;

    if (!request.query.num
      || !Account.AccountModel.canAccessLevel(userCopy, request.query.num)) {
      response.redirect('/level-select');
      return Promise.reject(0);
    }

    userCopy.startTime = Date.now();
    return userCopy.save();
  })
  .then((user) => {
    const date = new Date(user.createdDate);
    const dateJoined = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const levelDetails = {
      username: user.username,
      csrfToken: request.csrfToken(),
      dateJoined,
      visitedHelp: user.visitedHelp,
    };
    response.render(`levels/${request.query.num}`, levelDetails);
  })
  .catch((err) => {
    if (err !== 0) {
      response.status(400).json({ error: err });
    }
  });
};

const getLevelSelectDetails = (request, response) => {
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
          levels,
          dateJoined,
          isPremium: user.isPremium,
          profilePic: user.data,
          visitedHelp: user.visitedHelp
        };
        response.json(levelDetails);
      });
  });
}

const completeLevel = (request, response) => {
  Account.AccountModel.findByUsername(request.session.account.username)
  .then(user => {
    if (!request.query.num
      || !Account.AccountModel.canAccessLevel(user, request.query.num)) {
      response.redirect('/level-select');
      return Promise.reject(0);
    }
    return Account.AccountModel.completeLevel(user, request.query.num);
  })
  .then(() => {
    response.status(200).send();
  })
  .catch((err) => {
    if (err !== 0) {
      response.status(400).json({ error: err });
    }
  });
};

const getHelp = (request, response) => {
  Account.AccountModel.findByUsername(request.session.account.username)
  .then(user => {
    const userCopy = user;
    userCopy.visitedHelp = true;
    return userCopy.save();
  })
  .then(() => {
    response.render('help', { csrfToken: request.csrfToken() });
  })
  .catch(err => {
    response.status(400).json({ error: err });
  });
};

const changeUsername = (request, response) => {
  Account.AccountModel.authenticate(request.session.account.username,
    request.body.password, (err, account) => {
      if (err || !account) {
        response.status(401).json({ error: 'invalid-credentials' });
        return;
      }
      const accountCopy = account;
      accountCopy.username = request.body.newUsername;
      accountCopy.save()
    .then(() => {
      const req = request;
      req.session.account = Account.AccountModel.toAPI(accountCopy);
      response.redirect('/level-select');
    })
    .catch(error => {
      response.status(400).json({ error });
    });
    });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;
  Account.AccountModel.authenticate(req.session.account.username, req.body.oldPassword,
    (err, account) => {
      if (err || !account) {
        response.status(401).json({ error: 'invalid-credentials' });
        return;
      }
      Account.AccountModel.generateHash(req.body.newPassword, (salt, hash) => {
        const accountCopy = account;
        accountCopy.salt = salt;
        accountCopy.password = hash;

        accountCopy.save()
      .then(() => {
        req.session.account = Account.AccountModel.toAPI(accountCopy);
        res.status(200).send();
      })
      .catch((errMsg) => {
        res.status(400).json({ error: errMsg });
      });
      });
    });
};

const upgrade = (request, response) => {
  const req = request;
  const res = response;

  Account.AccountModel.findByUsername(req.session.account.username)
  .then(user => {
    const userCopy = user;
    userCopy.isPremium = true;
    return userCopy.save();
  })
  .then(() => {
    res.status(200).send();
  })
  .catch(err => {
    res.status(400).json({ error: err });
  });
};

// @see https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
};

// Our upload controller
const upload = (request, response) => {
  const req = request;
  const res = response;

  // If there are no files, return an error
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  // Otherwise, grab the file we are looking for
  // This name (sampleFile) comes from the html form's input
  const sampleFile = req.files.sampleFile;

  return Account.AccountModel.findByUsername(request.session.account.username)
  .then(user => {
    const userCopy = user;
    userCopy.data = `data:${sampleFile.mimetype};base64,${arrayBufferToBase64(sampleFile.data)}`;
    userCopy.markModified('data');
    return userCopy.save();
  })
  .then(() => {
    response.json({ redirect: '/level-select' });
    return Promise.resolve();
  })
  .catch((err) => {
    response.status(400).json({ error: err });
  });
};


// Our retrieval controller
const retrieveImage = (req, res) => {
  // Find the file by name in the database if it exists
  Account.AccountModel.findByUsername(req.session.account.username)
  .then(user => {
    // If there is a doc, setup the mimetype and file size
    res.contentType('json');
    // Finally send back the image data
    return res.send(user.data);
  })
  .catch(err => {
    res.status(400).json({ error: err });
  });
};

const getLeaderboardPage = (req, res) => {
  res.render('leaderboard');
};

const getHighScores = (req, res) => {
  const highscores = [];
  // Find all account documents
  Account.AccountModel.find()
  .then(docs => {
    // Determine the number of levels
    let levelCount = docs[0].completionTimes.length;
    for (let i = 0; i < levelCount; ++i) {
      // Generate a report for each level
      let levelScores = docs.map(doc => {
        return {
          username: doc.username,
          score: doc.completionTimes[i]
        };
      });
      levelScores.sort((a, b) => {
        if (a.score == 0) {
          return 1;
        }
        else if (b.score == 0) {
          return -1;
        }
        else {
          return a.score - b.score;
        }
      });
      highscores.push(levelScores);
    }

    res.json(highscores);
  });
};


module.exports = {
  loginPage, login, logout, signupPage, signup,
  levelSelectPage, tutorialPage, completeTutorial,
  getLevel, completeLevel, getHelp,
  changeUsername, changePassword,
  upgrade, upload, retrieveImage, getCsrf,
  getLevelSelectDetails, getLeaderboardPage,
  getHighScores
};
