"use strict";

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    points: {
      type: Number,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Organization",
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "updatedDate",
    },
  }
);

module.exports = mongoose.model("Role", roleSchema);
