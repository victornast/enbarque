'use strict';

const mongoose = require('mongoose');

const defaultLevelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  //how should I call this?
  level: {
    type: Number
  }
});

module.exports = mongoose.model('DefaultLevel', defaultLevelSchema);
