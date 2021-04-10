'use strict';

const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    level: {
      type: Number
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Organization'
    }
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  }
);

module.exports = mongoose.model('Level', levelSchema);
