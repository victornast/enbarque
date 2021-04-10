"use strict";

const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
      },
      postcode: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    // company logo?
    logo: {
      type: String,
    },
    admin: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    email: {
      required: true,
      lowercase: true,
      trim: true,
    },
    // defaultEmailDomain: {
    //   type: String,
    // },
    website: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "updatedDate",
    },
  }
);

module.exports = mongoose.model("Organization", organizationSchema);
