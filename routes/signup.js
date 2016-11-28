var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
// var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页面
router.get('/', function(req, res, next) {
  res.render('signup.html');
})

// POST /signup 用户注册
router.post('/', function(req, res, next) {
  var name = req.body.name;
  // var gender = req.fields.gender;
  // var bio = req.fields.bio;
  // var avatar = req.fields.avatar.path.split(path.sep).pop();
  var password = req.body.password;
  // var repassword = req.fields.repassword;

  // 明文密码加密
  password = sha1(password);

  // 待写入数据库的用户信息
  var user = {
    name: name,
    // gender: gender,
    password: password,
    // bio: bio,
    // avatar: avatar
  };

/* mongoose
  var result = new User(user);
  result.save(function(err, msg) {
    if (err) {
      res.send(err).status(501);
      next(err);
    }else {
      res.json(msg).status(201);
    }
  }) 
*/

  // 用户信息写入数据库
  UserModel.create(user)
    .then(function(result) {
      // 此user是插入mongodb后的值，包含_id
      user = result.ops[0];
      // 将用户信息存入session
      delete user.password;
      req.session.user = user;
      // 写入flash
      // req.flash('success', '注册成功');
      res.json({message: "注册成功！"});
    })
    .catch(function(e) {
      if (e.message.match('E1100 duplicate key')) {
        req.flash('error', '用户名已被占用');
        return res.redirect('/signup');
      }
      next(e);
      console.log(e);
    })
})

module.exports = router;