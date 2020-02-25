'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Games = require('../models/game');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'codeIRON' });
});

router.get('/home', routeGuard, (req, res, next) => {
  const userId = req.user._id;
  Games.find()
    .then(games => {
      console.log(games);
      games.map(game => {
        if (userId.toString() === game.author.toString()) {
          console.log('condition true');
          game.sameUser = true;
        } else {
          console.log('condition false');
          game.sameUser = false;
        }
      });
      res.render('home', { games });
    })
    .catch(error => next(error));
});

module.exports = router;
