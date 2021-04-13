'use strict';

const express = require('express');
const router = new express.Router();
const Task = require('../models/task.model');
//const routeGuard = require('../middleware/route-guard');

router.get('/', async (req, res, next) => {
  try {
    console.log('Listing all tasks.');
    res.json({ status: 'success' });
    const allTasks = await Task.find();
    res.json({ allTasks });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
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

router.post('/:id/edit', async (req, res, next) => {
  try {
    console.log('Editing a task.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', async (req, res, next) => {
  try {
    console.log('Deleting a task.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    console.log('Finding a task.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
