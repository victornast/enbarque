"use strict";

const mongoose = require("mongoose");

const defaultRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["onboardee", "mentor", "manager", "hr", "normal"],
  },
  //how should I call this?
  points: {
    type: Number,
    enum: [1, 2, 3, 8, 10],
  },
});

module.exports = mongoose.model("DefaultRole", defaultRoleSchema);
