'use strict';

const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
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

module.exports = router;
