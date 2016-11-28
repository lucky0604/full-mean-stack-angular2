var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin页面
router.get('/', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
})

// POST /signin 用户登陆
router.post('/', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
})

module.exports = router;