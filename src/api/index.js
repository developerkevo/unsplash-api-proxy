const express = require('express');

const emojis = require('./emojis');
const unsplash = require('./unsplash');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'hello '
  });
});

router.use('/emojis', emojis);
router.use('/photos', unsplash);

module.exports = router;
