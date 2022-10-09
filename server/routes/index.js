const express = require('express');
const router = express.Router();
const ExceptionHelper = require('./exception-helper');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/save', async (req, res, next) => {
  const { error } = req.body;
  const err = await ExceptionHelper.getClientException(error);
  console.log(err);
  res.json(err);
})

module.exports = router;
