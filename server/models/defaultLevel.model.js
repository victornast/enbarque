'use strict';

const mongoose = require('mongoose');

const defaultLevelSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['junior', 'intermediate', 'advanced', 'senior', 'expert']
  },
  //how should I call this?
  level: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  }
});

module.exports = mongoose.model('DefaultLevel', defaultLevelSchema);
