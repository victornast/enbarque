'use strict';

const { Router } = require('express');

const Feedback = require('../models/processFeedbackMessage.model');

const router = new Router();

router.post('/', async (req, res, next) => {
  const data = {
    content: req.body.content,
    userId: req.body.user._id,
    processId: req.body.process._id
  };
  try {
    let feedbackMessage = await Feedback.create(data);
    feedbackMessage = await Feedback.findById(feedbackMessage._id).populate(
      'userId'
    );
    res.json({ feedbackMessage });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const feedbackMessages = await Feedback.find({
      processId: req.params.id
    }).populate('userId');
    res.json({ feedbackMessages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
