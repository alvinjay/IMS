/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var incident = require('./incident.model');

exports.register = function(socket) {
  incident.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  incident.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('incident:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('incident:remove', doc);
}
