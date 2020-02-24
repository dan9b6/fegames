'use strict';

const { Router } = require('express');
const router = new Router();

const Game = require('../models/game');

router.get('/:userId/create-game', (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
});

module.exports = router;
