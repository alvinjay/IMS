/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /incidents              ->  index
 * POST    /incidents              ->  create
 * GET     /incidents/:id          ->  show
 * PUT     /incidents/:id          ->  update
 * DELETE  /incidents/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Incident = require('./incident.model');

// Get list of Incidents
exports.index = function(req, res) {
  Incident.find(function (err, Incidents) {
    if(err) { return handleError(res, err); }
    return res.json(200, Incidents);
  });
};

// Get a single Incident
exports.show = function(req, res) {
  Incident.findById(req.params.id, function (err, Incident) {
    if(err) { return handleError(res, err); }
    if(!Incident) { return res.send(404); }
    return res.json(Incident);
  });
};

// Creates a new Incident in the DB.
exports.create = function(req, res) {
  Incident.create(req.body, function(err, Incident) {
    if(err) { return handleError(res, err); }
    return res.json(201, Incident);
  });
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
