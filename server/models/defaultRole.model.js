'use strict';

const mongoose = require('mongoose');

const defaultRoleSchema = new mongoose.Schema({
  name: {
    type: String
  },
  //how should I call this?
  points: {
    type: Number
  }
});

module.exports = mongoose.model('DefaultRole', defaultRoleSchema);
