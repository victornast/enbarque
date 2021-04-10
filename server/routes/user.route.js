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

router.patch('/:id', async (req, res, next) => {
  const { role, level, position, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role,
        level,
        position,
        avatar
      },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
