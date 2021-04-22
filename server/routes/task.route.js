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
    console.log('allTasks: ', allTasks);
  } catch (error) {
    next(error);
  }
});

router.post('/create', routeGuard, async (req, res, next) => {
  const { headline, description, duration } = req.body;
  console.log('req.body: ', req.body);
  const newTask = {
    headline,
    description,
    organization: req.user.organization,
    duration
  };
  console.log('new task is created');
  console.log('req.body.position ', req.body.position);

  if (req.body.position) newTask.position = req.body.position;

  try {
    const createdTask = await Task.create(newTask);
    console.log('createdTask', createdTask);
    res.json({ createdTask });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', routeGuard, async (req, res, next) => {
  console.log('Editing a task.');
  try {
    const id = req.params.id;
    const data = req.body;
    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    console.log('backend task: ', task);
    res.json({ status: 'success', task: task });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', routeGuard, async (req, res, next) => {
  try {
    console.log('Deleting a task.');
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
    console.log('task: ', task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
