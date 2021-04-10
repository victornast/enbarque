'use strict';

const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      street: {
        type: String
      },
      postcode: {
        type: String
      },
      city: {
        type: String
      },
      country: {
        type: String
      }
    },
    logo: {
      type: String,
      default: ''
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    email: {
      required: true,
      lowercase: true,
      trim: true
    },
    website: {
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

module.exports = mongoose.model('Organization', organizationSchema);
