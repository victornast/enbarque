'use strict';

const { Router } = require('express');

const User = require('../models/user.model');
const Position = require('../models/position.model');
const Level = require('../models/level.model');
const Role = require('../models/role.model');
const generatePassword = require('../utilities/generate-password');
const sendEmail = require('../utilities/send-email');
const bcryptjs = require('bcryptjs');
const routeGuard = require('../middleware/route-guard');

const router = new Router();

router.post('/create', routeGuard, async (req, res, next) => {
  const { firstName, lastName, email, position, role, level } = req.body;
  const orgId = req.user.organization;
  const password = await generatePassword();
  const hash = await bcryptjs.hash(password, 10);

  const token = await generatePassword();

  try {
    const positionObject = await Position.findOne({
      $and: [{ name: position }, { organization: orgId }]
    });
    const levelObject = await Level.findOne({
      $and: [{ name: level }, { organization: orgId }]
    });
    const roleObject = await Role.findOne({
      $and: [{ name: role }, { organization: orgId }]
    });
    const positionId = positionObject._id;
    const levelId = levelObject._id;
    const roleId = roleObject._id;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      organization: orgId,
      passwordHashAndSalt: hash,
      position: positionId,
      role: roleId,
      level: levelId,
      token
    });

    await sendEmail({
      receiver: newUser.email,
      subject: 'Invitation to the Onboarding Dashboard!',
      body: `<h3>Hello ${firstName}!</h3>
      <p>Welcome to our onboarding process!</p>

      <p>Click <a href="http://localhost:3000/welcome?token=${token}"><b>here</b></a> to visit your dashboard</p>
      <p>Log in email: ${email}<br>
      
      <p>We are looking forward to welcoming you soon!</p>
      <p>${req.user.firstName} ${req.user.lastName}`
    });
    res.json({ newUser });
  } catch (error) {
    next(error);
  }
});

router.get('/welcome/:token', async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ token: token });
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (req.body.password) {
      const hash = await bcryptjs.hash(req.body.password, 10);
      let user = await User.findByIdAndUpdate(
        id,
        { passwordHashAndSalt: hash },
        { new: true }
      );
      user = await User.findByIdAndUpdate(
        id,
        { $unset: { token: '' } },
        { new: true }
      );

      req.session.userId = user._id;

      res.json({ user });
    } else {
      const user = await User.findByIdAndUpdate(id, data);

      res.json({ user });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', routeGuard, async (req, res, next) => {
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
