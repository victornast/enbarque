'use strict';

const { Router } = require('express');

const User = require('../models/user.model');
const Position = require('../models/user.model');
const Level = require('../models/user.model');
const Role = require('../models/user.model');

const router = new Router();

router.post('/create', async (req, res, next) => {
  const { firstName, lastName, email, position, role, level } = req.body;
  const orgId = req.user.organization;
  try {
    const positionId = await Position.findOne({
      $and: [{ name: position }, { organization: orgId }]
    });
    const levelId = await Level.findOne({
      $and: [{ name: level }, { organization: orgId }]
    });
    const roleId = await Role.findOne({
      $and: [{ name: role }, { organization: orgId }]
    });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      organization: orgId,
      positionId,
      roleId,
      levelId
    });
    console.log('Creating user');
    res.json({ status: 'success', newUser });
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
