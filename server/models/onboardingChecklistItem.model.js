'use strict';

const mongoose = require('mongoose');

const onboardingChecklistItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    description: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  }
);

module.exports = mongoose.model(
  'OnboardingChecklistItem',
  onboardingChecklistItemSchema
);
