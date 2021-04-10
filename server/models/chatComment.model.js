'use strict';

const mongoose = require('mongoose');

const chatCommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    processId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'OnboardingProcess'
    },
    content: {
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

module.exports = mongoose.model('chatComment', chatCommentSchema);
