let express = require("express")
 , url = require("url")
 , path = require('path')
 , logger = require('morgan')
 , cookieParser = require('cookie-parser')
 , bodyParser = require('body-parser')
 , index = require('./routes/index');
 const apiWidget = require('./api/widgetAPIs');
// Create the application. 
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("combined"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));
app.use('/', index);
app.use('/api', apiWidget);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  module.exports = app;
  