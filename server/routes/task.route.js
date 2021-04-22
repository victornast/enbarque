'use strict';

const express = require('express');
const router = new express.Router();
const Task = require('../models/task.model');

const routeGuard = require('../middleware/route-guard');

router.get('/', routeGuard, async (req, res, next) => {
  try {
    const allTasks = await Task.find({ organization: req.user.organization })
      .populate('organization')
      .populate('position');
    res.json({ allTasks });
  } catch (error) {
    next(error);
  }
});

router.post('/create', routeGuard, async (req, res, next) => {
  const { headline, description, duration } = req.body;
  const newTask = {
    headline,
    description,
    organization: req.user.organization,
    duration
  };

  if (req.body.position) newTask.position = req.body.position;

  try {
    const createdTask = await Task.create(newTask);
    res.json({ createdTask });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', routeGuard, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    res.json({ status: 'success', task: task });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', routeGuard, async (req, res, next) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', routeGuard, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate([
      'organization',
      'position'
    ]);
    res.json({ task });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
