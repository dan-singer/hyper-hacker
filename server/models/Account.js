const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let AccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  completionTimes: {
    type: [Number],
    default: [0, 0, 0, 0, 0, 0],
  },
  startTime: {
    type: Number,
    default: 0,
  },
  completedTutorial: {
    type: Boolean,
    default: false,
  },
  visitedHelp: {
    type: Boolean,
    default: false,
  },
  //https://github.com/richardgirges/express-fileupload/tree/master/example
  name: {
    type: String,
    default: "defaultProfile",
  },
  data: {
    type: Buffer,
    default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA4CAYAAACYCio/AAAB9UlEQVRYR+2Z4VXDMAyEP08AG8AGtBMAEwAblA3YgLABG8AGlAloJ4BuABMAE5h3dtKkadIkdVv8w30vv2op55Os6CzDkJ9lBFwDF8B5i+kcmAFTDB993ZteCy0T4A4467W+XLQAHjE8d9ltBmI5Beekbfdd/ov/xdIEw2ebQTsQ60IgEEd939ax7jcHM21a1wzEh+JpRwDqbm6bQrUOxDPxsicQhdsbDCvMrALxOaFM31U42vajMI2qOVMHomMXmph9yZxjXBlwvxLIfvOiDdwyX6pAFJKhdaLv7tvWLTCuSOaM+Ir5Hup1S/uxKrBnxJIB91s6CjV7wJAVQA6ZpHXgLmkLIDZ0W0H2BhMREMsx8B20o1Bjx0g0QPypSTmS1/dlskZzfKMpaJGUeJ+wEXz0PJBDdGb1irPs1CJsjDwrkbSKhwtRR/NcRHC/bWNPOVGCiUBglWAikJxl8ibtq2OctK9Pz2gKmnVXTv+ufSP56EXRBiTt645I0r7rujBp3zonufbVhdpbqI4OtB9LhMcA5DIBqYUyMVLP7cRIlRE3VNKpkWRQQ3QSWAuGmn8BWTG7qd7Fq55obnc11OPA9a9uMrZxXlP2rerW1MnvakigIaP0kSafjXO9ruGi7mDFlG6U9CiMXeD0Ur1MFz96Zhh+ulj7A9IVrgHwkue8AAAAAElFTkSuQmCC'
  },
  size: {
    type: Number,
    default: "445",
  },
  encoding: {
    type: String,
  },
  tempFilePath: {
    type: String,
  },
  truncated: {
    type: Boolean,
    default: false,
  },
  mimetype: {
    type: String,
    default: 'image/png'
  },
  md5: {
    type: String,
  },
});

AccountSchema.statics.toAPI = doc => ({
  // _id is built into your mongo document and is guaranteed to be unique
  username: doc.username,
  _id: doc._id,
});

AccountSchema.statics.canAccessLevel = (user, level) => (level < 4 || user.isPremium);

AccountSchema.statics.completeLevel = (user, level) => {
  const userCopy = user;
  const delta = Date.now() - userCopy.startTime;
  userCopy.completionTimes[level] = delta;
  userCopy.markModified('completionTimes'); // Force the database to be updated
  return userCopy.save();
};

AccountSchema.statics.completeTutorial = (user) => {
  const userCopy = user;
  userCopy.completedTutorial = true;
  return userCopy.save();
};

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

AccountSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return AccountModel.findOne(search, callback);
};

AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex'))
  );
};

AccountSchema.statics.authenticate = (username, password, callback) =>
  AccountModel.findByUsername(username, (err, doc) => {
    if (err) {
      return callback(err);
    }

    if (!doc) {
      return callback();
    }

    return validatePassword(doc, password, (result) => {
      if (result === true) {
        return callback(null, doc);
      }

      return callback();
    });
  });

AccountModel = mongoose.model('Account', AccountSchema);

module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;
