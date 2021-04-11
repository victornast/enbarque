'use strict';

const { Router } = require('express');

const User = require('../models/user.model');

const router = new Router();

router.post('/create', async (req, res, next) => {
  const { firstName, lastName, email, position, role, level } = req.body;
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      position,
      role,
      level
    });
    console.log('Creating user');
    res.json({ status: 'success', newUser: newUser });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    console.log('Updating user');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate([
      'role',
      'position',
      'level'
    ]);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
