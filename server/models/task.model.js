'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Position'
    },
    duration: {
      type: Number, // Amount of hours needed
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  }
);

module.exports = mongoose.model('Task', taskSchema);
