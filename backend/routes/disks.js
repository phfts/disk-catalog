var express = require('express');
var router = express.Router();
var Disk = require('../model/disk');

function buildResponse(err, data) {
  if (err) {
    this.status(500).send({error: err})
  } else {
    this.send(data || {})
  }
}

router.get('/', function(req, res, next) {
  Disk.find(buildResponse.bind(res));
});

router.get('/:id', function(req, res, next) {
  Disk.findById(req.params.id, buildResponse.bind(res));
});

router.delete('/:id', function(req, res, next) {
  Disk.findById(req.params.id).remove(buildResponse.bind(res));
});

router.patch('/:id', function(req, res, next) {
  Disk.findOneAndUpdate(req.params.id, req.body, buildResponse.bind(res));
});

router.post('/', function(req, res, next) {
  var disk = new Disk(req.body.disk);
  disk.save(buildResponse.bind(res));
});

module.exports = router;
