'use strict';

const mongoose = require('mongoose');

const onboardingProcessSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Organization'
    },
    onboardee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    startingDate: {
      type: Date
    },
    amountOfDays: {
      type: Number // Amount of days
    },
    scheduledTasks: [
      {
        task: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task'
        },
        startingTimeSlot: {
          type: Date
        },
        taskStatus: {
          type: String,
          enum: ['OPEN', 'CLOSED'],
          default: 'OPEN'
        },
        timeslotSize: {
          type: Number,
          default: 1
        },
        loggedTime: [
          {
            startingTime: {
              type: Date
            },
            duration: {
              type: Number
            }
          }
        ]
      }
    ],
    unscheduledTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  }
);

module.exports = mongoose.model('OnboardingProcess', onboardingProcessSchema);
