'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IncidentSchema = new Schema({
  id: {
    type:String,
    unique: true
  },
  _officer: {type: Schema.Types.ObjectId, ref: 'Officer'},
  type: String,
  sender: {name: String, contact: String},
  location: {
    type: {
      type: String,
      required: true,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: [Number]
  },
  timestamp: Number,
  attachment: {img: String},
  notes: [String],
  documents: [String]
});

module.exports = mongoose.model('Incident', IncidentSchema);
