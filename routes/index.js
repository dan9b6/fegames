'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'IronGames' });
});

router.get('/home', routeGuard, (req, res, next) => {
  res.render('home');
});

module.exports = router;
