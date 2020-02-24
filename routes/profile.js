'use strict';

const { Router } = require('express');
const router = new Router();

const User = require('./../models/user');
const uploader = require('./../middleware/upload');
const routeGuard = require('./../middleware/route-guard');
const Games = require('./../models/game.js');

router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  let userInfo;
  User.findById(userId)
    .then(data => {
      userInfo = data;
      return Games.find({ author: userId });
    })
    .then(games => {
      res.render('profile', { userInfo, games });
    })
    .catch(error => console.log(error));
});

router.get('/:userId/edit', (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId).then(user => {
    res.render('profile-edit', user);
  });
});

//create middleware for image upload

router.post('/:userId/edit', uploader.single('photo'), (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, campus } = req.body;

  let profilePicture;
  if (req.file) {
    profilePicture = req.file.url;
  }

  User.findByIdAndUpdate(userId, {
    ...(name ? { name } : {}),
    ...(email ? { email } : {}),
    ...(campus ? { campus } : {}),
    ...(profilePicture ? { profilePicture } : {})
  })
    .then(() => {
      res.redirect(`/profile/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
