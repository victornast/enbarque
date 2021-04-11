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
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    role,
    level,
    position
  } = req.body;
  let avatar;
  if (req.body.avatar) {
    avatar = req.body.avatar;
  }
  const { name, adress, emailCorp, website } = req.body;
  let logo;
  if (req.body.logo) {
    logo = req.body.logo;
  }

  try {
    const hash = await bcryptjs.hash(password, 10);
    const company = await Organization.create({
      name,
      adress,
      logo,
      emailCorp,
      website
    });
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      passwordHashAndSalt: hash,
      organization: company._id,
      role,
      level,
      position,
      avatar
    });
    await Organization.findByIdAndUpdate(company._id, { admin: user._id });

    const defaultRoles = await DefaultRole.find();
    for (const defaultRole in defaultRoles)
      await Role.create({ ...defaultRole, organization: company._id });

    const defaultLevels = await DefaultLevel.find();
    for (const defaultLevel in defaultLevels)
      await Level.create({ ...defaultLevel, organization: company._id });

    const defaultPositions = await DefaultPosition.find();
    for (const defaultPosition in defaultPositions)
      await Position.create({ ...defaultPosition, organization: company._id });

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
