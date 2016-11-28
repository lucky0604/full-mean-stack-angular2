/*
var PORT = 8000 || process.env.PORT;
var DB = "mongodb://localhost/angularhuman";
var mainRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/api/users', userRouter);

mongoose.connect(DB, function(err) {
    if (err) {
        return err;
    } else {
        console.log('Successfully connected to ' + DB);
    }
});
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));

// render html as ejs
app.engine('html', require('ejs').renderFile);

app.listen(PORT, function() {
    console.log('Server is running on port ' + PORT);
});
*/

var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));

app.engine('html', require('ejs').renderFile);

//session middleware
app.use(session({
    name: config.session.key,   // 设置cookie中保存session id的字段
    secret: config.session.secret,  // 通过设置secret来计算hash值并放在cookie中，　使产生的signedCookie防篡改
    cookie: {
        maxAge: config.session.maxAge   // cookie的过期时间
    },
    store: new MongoStore({     // 将session存储到mongodb
        url: config.mongodb
    })
}));

// flash middleware, show the notification
app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'client/img'),  // 上传文件目录
    keepExtensions: true    // 保留后缀
}));

// 设置模板全局变量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}

// 添加模板必要的三个变量
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
})

// routes
routes(app);

// listen the port
app.listen(config.port, function() {
    console.log(`${pkg.name} listening on port ${config.port}`);
})
