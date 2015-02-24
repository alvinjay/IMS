'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OfficerSchema = new Schema({
  id: String,
  name: String,
  areaCode: String,
  picture: String,
  contact: String
});

module.exports = mongoose.model('Officer', OfficerSchema);
