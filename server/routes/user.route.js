'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

const router = new Router();

router.post('/create', async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    level,
    position,
    avatar,
    organization
  } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHashAndSalt: hash,
      organization,
      role,
      level,
      position,
      avatar
    });
    req.session.userId = user._id;
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
