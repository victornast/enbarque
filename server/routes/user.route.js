'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

const router = new Router();

router.post('/create', async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHashAndSalt: hash,
      role
    });
    req.session.userId = user._id;
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
