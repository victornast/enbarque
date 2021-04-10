'use strict';

const express = require('express');
const router = new express.Router();
//const routeGuard = require('../middleware/route-guard');

router.get('/', async (req, res, next) => {
  try {
    console.log('Listing all onboarding processes.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    console.log('Creating an onboarding process.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', async (req, res, next) => {
  try {
    console.log('Editing an onboarding processes.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', async (req, res, next) => {
  try {
    console.log('Deleting an onboarding processes.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    console.log('Listing an onboarding processes.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:processId/task/:taskId', async (req, res, next) => {
  try {
    console.log('Updating time for a task in a process.');
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
