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
var Officer = require('./officer.model'),
    Incident = require('../incident/incident.model');

// Get list of Officers(populated w/ incidents)
exports.index = function(req, res) {
  Officer
    .find()
    .populate('incidents')
    .exec(function (err, Officers) {
      if(err) { return handleError(res, err); }
      return res.json(200, Officers);
    });
};

// Get a single Officer
exports.show = function(req, res) {
  Officer.find({id: req.params.id}, function (err, Officer) {
    if(err) { return handleError(res, err); }
    if(!Officer) { return res.send(404); }
    return res.json(Officer);
  });
};

// Creates a new Officer in the DB.
exports.create = function(req, res) {
  Officer.create(req.body, function(err, Officer) {
    if(err) { return handleError(res, err); }
    return res.json(201, Officer);
  });
};

// Updates an existing Officer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Officer.findById(req.params.id, function (err, Officer) {
    if (err) { return handleError(res, err); }
    if(!Officer) { return res.send(404); }
    var updated = _.merge(Officer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Officer);
    });
  });
};

// Deletes a Officer from the DB.
exports.destroy = function(req, res) {
  Officer.findById(req.params.id, function (err, Officer) {
    if(err) { return handleError(res, err); }
    if(!Officer) { return res.send(404); }
    Officer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
