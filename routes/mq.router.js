const express = require('express');
const router = express.Router();
const { sendToQueue } = require('../services/mq');
const mqConfig = require('../config/activemq');

// POST /mq/send { message: any }
router.post('/send', (req, res) => {
  const { message } = req.body;
  if (typeof message === 'undefined') {
    return res.status(400).json({ error: 'message required' });
  }
  sendToQueue(mqConfig.demoQueue, message, (err) => {
    if (err) {
      // Normalize AggregateError and other non-standard errors
      let msg = err && err.message ? err.message : String(err);
      if (Array.isArray(err?.errors) && err.errors.length > 0) {
        msg = err.errors[0]?.message || String(err.errors[0]);
      }
      return res.status(500).json({ error: msg });
    }
    return res.json({ queued: true, destination: mqConfig.demoQueue });
  });
});

module.exports = router;
