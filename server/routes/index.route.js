'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.json({
    type: 'success',
    data: {
      title: 'enbarque',
      description: 'an onboarding app',
      commentary: '3rd Ironhack Application - SPA',
      authors: 'Harumi Terayama, Katja Maasch, Matías Puletti & Victor Nastasa'
    }
  });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
