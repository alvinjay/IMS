'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OfficerSchema = new Schema({
  id: String,
  name: String,
  station: String,
  picture: String,
  contact: String,
  incidents: [{ type: Schema.Types.ObjectId, ref: 'Incident' }]
});

module.exports = mongoose.model('Officer', OfficerSchema);
