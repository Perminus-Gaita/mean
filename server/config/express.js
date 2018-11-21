const path = require('path');
const express = require('express');
const httpError = require('http-errors');          /*Create HTTP errors for Express, Koa, Connect, etc. with ease*/
const logger = require('morgan');                  /*A simple logging library that combines the simple APIs of Ruby's 
                                                     logger.rb and browser-js console.log() It helps to console.log
                                                     process in a user friendly syntax
                                                     */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');     /*Parse Cookie header and populate req.cookies with an 
                                                     object keyed by the cookie names. Optionally you may 
                                                     enable signed cookie support by passing a secret string, 
                                                     which assigns req.secret so it may be used by other middleware.
                                                     */
const compress = require('compression');             /*Compress a HTTP message*/
const methodOverride = require('method-override');   /*Lets you use HTTP verbs such as PUT or DELETE in places where 
                                                       the client doesn't support it*/
const cors = require('cors');                        /*CORS is a node.js package for providing a Connect/Express middleware
                                                       that can be used to enable CORS* with various options.
                                                      */
const helmet = require('helmet');                     /*Helmet helps you secure your Express apps by setting various HTTP 
                                                        headers. It's not a silver bullet, but it can help!
                                                      */
const swaggerUi = require('swagger-ui-express');      /*Adds middleware to your express app to serve the Swagger UI bound 
                                                        to your Swagger document. This acts as living documentation for your 
                                                        API hosted from within your app.
                                                        Swagger version is pulled from npm module swagger-ui-dist. 
                                                        Please use a lock file or specify the version of swagger-ui-dist 
                                                        you want to ensure it is consistent across environments.
                                                        */
const swaggerDocument = require('./swagger.json');
const routes = require('../routes/index.route');
const config = require('./config');
const passport = require('./passport')

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';
if (config.frontend == 'react'){
  distDir ='../../node_modules/material-dashboard-react/dist'
 }else{
  distDir ='../../dist/' ;
 }

// 
app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

console.log(distDir);
 //React server
app.use(express.static(path.join(__dirname, '../../node_modules/material-dashboard-react/dist')))
app.use(/^((?!(api)).)*/, (req, res) => {
res.sendFile(path.join(__dirname, '../../dist/index.html'));
}); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API router
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;


/*Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested
from another domain outside the domain from which the first resource was served.A web page may freely embed cross-origin 
images, stylesheets, scripts, iframes, and videos.Certain "cross-domain" requests, notably Ajax requests, are forbidden 
by default by the same-origin security policy.
CORS defines a way in which a browser and server can interact to determine whether or not it is safe to allow the cross-origin 
request.It allows for more freedom and functionality than purely same-origin requests, but is more secure than simply allowing 
all cross-origin requests. The specification for CORS was originally published as a W3C Recommendation but that document is 
obsolete.The current actively-maintained specification that defines CORS is WHATWG's Fetch Living Standard.
*/
