'use strict';

const express = require('express');
const router = new express.Router();
const Task = require('../models/task.model');
//const routeGuard = require('../middleware/route-guard');

router.get('/', async (req, res, next) => {
  try {
    console.log('Listing all tasks.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    console.log('Creating a task.');
    res.json({ status: 'success' });
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
