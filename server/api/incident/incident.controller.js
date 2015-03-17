/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /incidents              ->  index
 * POST    /incidents              ->  create
 * GET     /incidents/:id          ->  show
 * PUT     /incidents/:id          ->  update
 * DELETE  /incidents/:id          ->  destroy
 */

'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var Incident = require('./incident.model'),
    Officer = require('../officer/officer.model');

// Get list of Incidents
exports.index = function(req, res) {
  if(_.isEmpty(req.query)){
    Incident
      .find()
      .populate('_officer')
      .exec(function (err, Incidents) {
        if(err) { return handleError(res, err); }
        return res.json(200, Incidents);
      });
  } else {

    var queryObject = {};
    if (typeof(req.query.officer) === 'undefined')
        queryObject.name = { $regex: "null" };
    else
        queryObject.name = { $regex: req.query.officer };

    Officer
      .findOne(queryObject)
      .exec(function (err, Officer) {

        // If officer query was filled and there is a match OR officer query was not filled
        if((typeof(req.query.officer) !== 'undefined' && !_.isNull(Officer)) || (typeof(req.query.officer) === 'undefined' && _.isNull(Officer))) {

          queryObject = {};
          // by Sender Name
          if (!(typeof(req.query.sender) === 'undefined')) {
            queryObject = {
              "sender.name": {$regex: req.query.sender}
            };
          }
          // by Type
          if (!(typeof(req.query.type) === 'undefined'))
            queryObject.type = req.query.type;
          // by Station
          if (!(typeof(req.query.station) === 'undefined'))
            queryObject.station = req.query.station;
          // by Officer Name
          if (!_.isNull(Officer))
            queryObject._officer = mongoose.Types.ObjectId(Officer._id);
          // by Date
          if (!(typeof(req.query.fromDate) === 'undefined') || !(typeof(req.query.fromDate) === 'undefined')) {
            queryObject.timestamp = {
              $gte: typeof(req.query.fromDate) === 'undefined' ? 0 : req.query.fromDate,
              $lte: typeof(req.query.toDate) === 'undefined' ? Date.now() : req.query.toDate
            }
          }

          Incident
            .find(queryObject)
            .exec(function (err, Incidents) {
              //console.log(Incidents);
              if (err) {
                return handleError(res, err);
              }
              return res.json(200, Incidents);
            });
        }
        else
          return res.json(200, []);

      })
  }

};

// Get a single Incident
exports.show = function(req, res) {
  Incident
    .findOne({ id: req.params.id })
    .populate('_officer')
    .exec(function (err, Incident) {
      if(err) { return handleError(res, err); }
      if(!Incident) { return res.send(404); }
      return res.json(Incident);
    });
};

// Get list of Incidents by filter
exports.getByFilter = function(req, res) {
  console.log('aw');
      //return res.json(200, {});
};

// Creates a new Incident in the DB.
exports.create = function(req, res) {
  // Find officer in incident data
  Officer.findOne({ id: req.body._officer }, function (err, officer) {
    if(err) { return handleError(res, err); }
    if(!officer) { return res.send(404); }
    // Edit the _officer var in req.body with mongoDB ID of officer
    req.body._officer = officer._id;
    // Create incident with ref to officer mongoDB ID
    Incident.create(req.body, function(err, newIncident) {
      if(err) { return handleError(res, err); }
      // TODO test which is right
      Officer.incidents.push(newIncident);
      //Officer.incidents.push(newIncident._id);
      Officer.save(null);

      Incident
        .findOne({ id: req.body.id })
        .populate('_officer')
        .exec(function (err, Incident) {
          return res.json(201, Incident);
        });
    });
  })

};

// Updates an existing Incident in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Incident.findById(req.params.id, function (err, Incident) {
    if (err) { return handleError(res, err); }
    if(!Incident) { return res.send(404); }
    var updated = _.merge(Incident, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Incident);
    });
  });
};

// Deletes a Incident from the DB.
exports.destroy = function(req, res) {
  Incident.findById(req.params.id, function (err, Incident) {
    if(err) { return handleError(res, err); }
    if(!Incident) { return res.send(404); }
    Incident.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.geo =  function(req, res) {
  Incident.geoNear([125.5,7.1],{maxDistance: 1000 / 6378137, distanceMultiplier: 6378137, spherical : true }, function (err, Incident) {
    if(err) { return handleError(res, err); }
    if(!Incident) { return res.send(404); }
    return res.json(Incident);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
