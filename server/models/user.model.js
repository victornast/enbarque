'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true
    },
    last_name: {
      type: String,
      trim: true,
      required: true
    },
    username: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHashAndSalt: {
      type: String
    },
    defaultPassword: {
      type: String
    },
    avatar: {
      type: String
      // Default avatar??
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Organization'
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level'
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Position'
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  }
);

module.exports = mongoose.model('User', userSchema);
