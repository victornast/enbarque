'use strict';

const express = require('express');
const router = new express.Router();
const Level = require('./../models/level.model');
const Position = require('./../models/position.model');
const Role = require('./../models/role.model');
const User = require('./../models/user.model');
//const routeGuard = require('../middleware/route-guard');

// Get the levels set by the manager
router.get('/levels', async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const orgId = user.oraganization;
    const response = await Level.findById(orgId);
    res.json({ levels: response });
  } catch (error) {
    next(error);
  }
});

router.get('/roles', async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const orgId = user.oraganization;
    const response = await Level.findById(orgId);
    res.json({ roles: response });
  } catch (error) {
    next(error);
  }
});

router.get('/positions', async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const orgId = user.oraganization;
    const response = await Position.findById(orgId);
    res.json({ positions: response });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
