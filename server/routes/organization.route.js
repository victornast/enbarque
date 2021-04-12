'use strict';

const express = require('express');
const router = new express.Router();
const Level = require('./../models/level.model');
const Position = require('./../models/position.model');
const Role = require('./../models/role.model');
const User = require('./../models/user.model');
//const routeGuard = require('../middleware/route-guard');

// Get the levels set by the manager
router.get('/:id/levels', async (req, res, next) => {
  const id = req.params.id;
  console.log('levels', id);
  try {
    const user = await User.findById(id);
    const orgId = user.oraganization;
    const response = await Level.findById(orgId);
    res.json({ levels: response });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/roles', async (req, res, next) => {
  const id = req.params.id;
  console.log('roles', id);
  try {
    const user = await User.findById(id);
    const orgId = user.oraganization;
    const response = await Role.findById(orgId);
    res.json({ roles: response });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/positions', async (req, res, next) => {
  const id = req.params.id;
  console.log('positions', id);
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
