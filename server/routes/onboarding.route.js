'use strict';

const express = require('express');
const router = new express.Router();
//const routeGuard = require('../middleware/route-guard');

const OnboardingProcess = require('../models/onboardingProcess.model');
const Task = require('../models/task.model');

router.get('/', async (req, res, next) => {
  try {
    const orgId = req.user.organization;
    const onboardingProcessPlans = await OnboardingProcess.find({
      organization: orgId
    });
    console.log('Listing all onboarding processes.');
    console.log(onboardingProcessPlans);
    res.json({ status: 'success', onboardingProcessPlans });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  const { onboardee, mentor, startDate, amountOfDays } = req.body;
  console.log(onboardee);
  try {
    const tasks = await Task.find({
      $and: [
        { organization: req.user.organization },
        {
          $or: [{ position: undefined }, { position: onboardee.position }]
        }
      ]
    });

    const onboardingObject = {
      organization: req.user.organization,
      onboardee: onboardee._id,
      manager: req.user._id,
      mentor,
      startingDate: new Date(startDate),
      amountOfDays,
      scheduledTasks: [],
      unscheduledTasks: [...tasks.map((task) => task._id)]
    };
    const onboardingProcess = await OnboardingProcess.create(onboardingObject);
    res.json({ onboardingProcess });
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
