/*

var express = require('express');
var router = express.Router();
var Model = require('../models/model.js');

router.get('/human', function(request, response) {
  Model.find({}, function(err, resource) {
    if (err) {
      response.send(err).status(404);
    } else {
      response.send(resource).status(200);
    }
  })
})

router.post('/human', function(request, response) {
  var human = new Model(request.body);
  human.save(function(err, resource) {
    if (err) {
      response.send(err).status(501);
    } else {
      response.json(resource).status(201);
    }
  })
})

router.get('/humans/:id', function(request, response) {
  var id = request.params.id;
  Model.findById(id, function(err, res) {
    if (err) {
      return response.send(err);
    } else {
      var human = res;
      response.json(human);
    }
  })
})

router.delete('/humans/:id', function(request, response) {
  var id = request.params.id;
  Model.remove({_id: id}, function(err, resource) {
    if (err) {
      return response.send(err);
    } else {
      response.send(resource);
    }
  })
})

module.exports = router;
*/