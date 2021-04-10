'use strict';

const mongoose = require('mongoose');

const defaultRoleSchema = new mongoose.Schema({
  name: {
    type: String
  },
  accessLevel: {
    type: Number
  }
});

module.exports = mongoose.model('DefaultRole', defaultRoleSchema);
