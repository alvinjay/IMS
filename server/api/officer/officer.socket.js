/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var officers = require('./officers.model');

exports.register = function(socket) {
  officers.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  officers.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('officers:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('officers:remove', doc);
}
