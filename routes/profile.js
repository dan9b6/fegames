'use strict';

const { Router } = require('express');
const router = new Router();

const User = require('./../models/user');

const routeGuard = require('./../middleware/route-guard');

router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  User.findById(userId).then(data => {
    console.log(data);
    res.render('profile', data);
  });
});

module.exports = router;
