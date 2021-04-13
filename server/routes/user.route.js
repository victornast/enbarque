'use strict';

const { Router } = require('express');

const User = require('../models/user.model');
const Position = require('../models/position.model');
const Level = require('../models/level.model');
const Role = require('../models/role.model');
const generatePassword = require('../utilities/generate-password');
const sendEmail = require('../utilities/send-email');
const bcryptjs = require('bcryptjs');

const router = new Router();

router.post('/create', async (req, res, next) => {
  const { firstName, lastName, email, position, role, level } = req.body;
  const orgId = req.user.organization;
  const password = await generatePassword();
  console.log(password);
  const hash = await bcryptjs.hash(password, 10);
  console.log('hash:', hash);
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
      passwordHashAndSalt: hash,
      positionId,
      roleId,
      levelId
    });
    console.log('Creating user');
    await sendEmail({
      receiver: process.env.EMAIL_ADDRESS,
      subject: 'Invitation to the Onboarding Dashboard!',
      body: `<h3>Hello ${firstName}!</h3>
      <p>Welcome to our onboarding process!</p>
      <p>You can log in and see the dashboard <a href="http://localhost:3000/auth/login">here</a></p>
      <p>Log in email: ${email}<br>
      Temporary password: ${password}</p>
      <p>We are looking forward to welcoming you soon!</p>
      <p>${req.user.firstName} ${req.user.lastName}`
    });
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
