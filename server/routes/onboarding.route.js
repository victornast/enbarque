'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('../middleware/route-guard');

const OnboardingProcess = require('../models/onboardingProcess.model');
const Task = require('../models/task.model');

router.get('/', async (req, res, next) => {
  try {
    const orgId = req.user.organization;
    const onboardingProcessPlans = await OnboardingProcess.find({
      organization: orgId
    });
    res.json({ onboardingProcessPlans });
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
    const id = req.params.id; // it's the user id and not the orgId
    console.log(id);
    const process = await OnboardingProcess.findOne({ onboardee: id })
      .populate('unscheduledTasks')
      .populate('scheduledTasks.task')
      .populate('onboardee')
      .populate('manager')
      .populate('mentor');
    console.log('Found an onboarding process.', process);
    res.json({ status: 'success', process });
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

router.patch('/:processId', async (req, res, next) => {
  try {
    const id = req.params.processId;
    const data = req.body;
    let updatedProcess;
    if (data.scheduledTasks) {
      console.log('Scheduling a task');
      updatedProcess = await OnboardingProcess.findByIdAndUpdate(
        id,
        {
          $push: {
            scheduledTasks: data.scheduledTasks
          },
          unscheduledTasks: data.unscheduledTasks
        },
        { new: true }
      )
        .populate('unscheduledTasks')
        .populate('scheduledTasks.task')
        .populate('mentor')
        .populate('manager');
      console.log('new scheduled tasks:', updatedProcess);
    } else {
      console.log('Updating the process');
      updatedProcess = await OnboardingProcess.findByIdAndUpdate(id, data, {
        new: true
      })
        .populate('unscheduledTasks')
        .populate('mentor')
        .populate('manager');
    }
    res.json({ updatedProcess });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:processId/backlog/:taskId',
  routeGuard,
  async (req, res, next) => {
    try {
      const processId = req.params.processId;
      const taskId = req.params.taskId;
      const updatedProcess = await OnboardingProcess.findByIdAndUpdate(
        processId,
        {
          $push: {
            unscheduledTasks: taskId
          }
        },
        { new: true }
      )
        .populate('unscheduledTasks')
        .populate('scheduledTasks.task')
        .populate('mentor')
        .populate('manager');
      console.log(updatedProcess);
      res.json({ updatedProcess });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:processId/status', routeGuard, async (req, res, next) => {
  try {
    const processId = req.params.processId;
    const task = req.body;
    const updatedProcess = await OnboardingProcess.findOneAndUpdate(
      { _id: processId, 'scheduledTasks._id': task._id },
      {
        $set: { 'scheduledTasks.$.taskStatus': 'CLOSED' }
      },
      { new: true }
    )
      .populate('unscheduledTasks')
      .populate('scheduledTasks.task')
      .populate('mentor')
      .populate('manager');
    console.log(updatedProcess);
    res.json({ updatedProcess });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/mentees', routeGuard, async (req, res, next) => {
  try {
    const id = req.params.id;
    const processes = await OnboardingProcess.find({ mentor: id }).populate(
      'onboardee'
    );
    res.json({ processes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
