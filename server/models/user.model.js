'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
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
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dny9keold/image/upload/v1618064278/enbarque/default-user_ccq75m.png',
      required: true
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
    },
    token: {
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

module.exports = mongoose.model('User', userSchema);
