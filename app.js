// Get the express framework
const express = require('express');
// Get the express-session library
const expressSession = require('express-session');

// dummy route for sending requests coming from /pub/ & /api/
const dummyRoute = require('./routes/dummyRoute');
const saveRoute = require('./routes/saveRoutes');

const app = express();
// express.json() is a method inbuilt in express to recognize
// the incoming Request Object as a JSON Object.
app.use(express.json());

// middleware to perform session
app.use(
  expressSession({ secret: 'this is node assessment', saveUninitialized: false, resave: false }),
);

// middleware to route to dummyRoute after performing session check.
app.use('/pub/proxy', verifySession, dummyRoute);
app.use('/api/proxy', verifySession, dummyRoute);
app.use('/save', verifySession, saveRoute);

// method that verifies session, if exist then proceed
// else respond with failed response
function verifySession(req, res, next) {
  if (req.session) next();
  else {
    res.status(400).json({
      status: 'FAILURE',
      data: {
        err: 'Session Missing',
      },
    });
  }
}
global.__basedir = __dirname;

module.exports = app;
