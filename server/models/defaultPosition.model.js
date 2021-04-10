"use strict";

const mongoose = require("mongoose");

const defaultPositionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("DefaultPosition", defaultPositionSchema);
