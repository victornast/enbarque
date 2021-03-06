'use strict';

const express = require('express');
const router = new express.Router();
const Level = require('./../models/level.model');
const Position = require('./../models/position.model');
const Role = require('./../models/role.model');
const User = require('./../models/user.model');
const routeGuard = require('../middleware/route-guard');

// Get all users in organization
router.get('/users', routeGuard, async (req, res, next) => {
  const searchQuery = {};
  searchQuery.organization = req.user.organization;
  try {
    const users = await User.find(searchQuery)
      .populate('role')
      .populate('level')
      .populate('position');
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

router.get('/users/:positionId', routeGuard, async (req, res, next) => {
  const positionId = req.params.positionId;
  const orgId = req.user.organization;
  try {
    const mentors = await User.find({
      $and: [
        {
          organization: orgId
        },
        {
          position: positionId
        }
      ]
    }).populate('level');
    res.json({ mentors });
  } catch (error) {
    next(error);
  }
});

// Get the levels set by the manager
router.get('/levels', routeGuard, async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const orgId = user.organization;
    const levels = await Level.find({ organization: orgId });
    res.json({ levels });
  } catch (error) {
    next(error);
  }
});

router.get('/roles', routeGuard, async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const orgId = user.organization;
    const response = await Role.find({ organization: orgId });
    res.json({ roles: response });
  } catch (error) {
    next(error);
  }
});

router.get('/positions', routeGuard, async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const orgId = user.organization;
    const response = await Position.find({ organization: orgId });
    res.json({ positions: response });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
