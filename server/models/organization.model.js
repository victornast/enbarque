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
      default:
        'https://res.cloudinary.com/dny9keold/image/upload/v1618064278/enbarque/default-organization_vpbtm9.png'
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    email: {
      type: String,
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
