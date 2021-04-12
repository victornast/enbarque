'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user.model');
const Organization = require('./../models/organization.model');
const DefaultLevel = require('./../models/defaultLevel.model');
const DefaultRole = require('./../models/defaultRole.model');
const DefaultPosition = require('./../models/defaultPosition.model');
const Level = require('./../models/level.model');
const Role = require('./../models/role.model');
const Position = require('./../models/position.model');
const fileUploadMiddleware = require('./../middleware/file-upload');

const router = new Router();

router.post('/signup', async (req, res, next) => {
  console.log('req: ', req);
  const { firstName, lastName, username, email, password } = req.body;
  const { name, adress, emailCorp, website } = req.body;

  try {
    const hash = await bcryptjs.hash(password, 10);
    const company = await Organization.create({
      name,
      adress,
      email: emailCorp,
      website
    });

    const defaultRoles = await DefaultRole.find().lean();
    for (const defaultRole of defaultRoles) {
      delete defaultRole._id;
      defaultRole.organization = company._id;
    }
    const corpRoles = await Role.create(defaultRoles);

    const defaultLevels = await DefaultLevel.find().lean();
    for (const defaultLevel of defaultLevels) {
      delete defaultLevel._id;
      defaultLevel.organization = company._id;
    }
    const corpLevels = await Level.create(defaultLevels);

    const defaultPositions = await DefaultPosition.find().lean();
    for (const defaultPosition of defaultPositions) {
      delete defaultPosition._id;
      defaultPosition.organization = company._id;
    }
    const corpPositions = await Position.create(defaultPositions);

    const role = corpRoles.reduce((prev, current) =>
      prev.accessLevel > current.accessLevel ? prev : current
    );
    const level = corpLevels.reduce((prev, current) =>
      prev.level > current.level ? prev : current
    );
    const position = corpPositions.filter((pos) => {
      if (pos.name === 'Manager') return pos;
    })[0];

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      passwordHashAndSalt: hash,
      organization: company._id,
      role: role._id,
      level: level._id,
      position: position._id
    });
    await Organization.findByIdAndUpdate(
      company._id,
      { admin: user._id },
      { useFindAndModify: false }
    );

    req.session.userId = user._id;
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/signin', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/signout', (req, res) => {
  req.session.destroy();
  res.json({});
});

router.get('/verify', (req, res) => {
  const user = req.user || null;
  res.json({ user: user });
});

module.exports = router;
