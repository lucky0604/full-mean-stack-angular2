var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin页面
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signin.html');
})

// POST /signin 用户登陆
router.post('/', checkNotLogin, function(req, res, next) {
  // res.send(req.flash());
  var name = req.body.name;
  var password = req.body.password;
  /*
  var user = {
    name: name,
    password: password
  }
  */
  console.log('here');

  UserModel.getUserByName(name)
    .then(function(user) {
      
      if (!user) {
        return res.redirect('back');
      }
      // 用户信息写入session
      delete user.password;
      req.session.user = user;
      // 跳转主页
      res.json({message: "登录成功！"});
      // res.redirect('/posts');
    })
    .catch(next);
})

module.exports = router;