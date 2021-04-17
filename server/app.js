'use strict';

const path = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');

const baseRouter = require('./routes/index.route');
const authenticationRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const organizationRouter = require('./routes/organization.route');
const taskRouter = require('./routes/task.route');
const onboardingRouter = require('./routes/onboarding.route');

const cors = require('cors');

const app = express();

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(
  cors({
    origin: (process.env.ALLOWED_CORS_ORIGINS || '').split(','),
    credentials: true
  })
);
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
      secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use('/', baseRouter);
app.use('/auth', authenticationRouter);
app.use('/user', userRouter);
app.use('/corp', organizationRouter);
app.use('/tasks', taskRouter);
app.use('/onboarding', onboardingRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
