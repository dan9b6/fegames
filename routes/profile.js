'use strict';

const { Router } = require('express');
const router = new Router();

const User = require('./../models/user');
const uploader = require('./../middleware/upload');
const routeGuard = require('./../middleware/route-guard');

router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  User.findById(userId).then(data => {
    console.log(data);
    res.render('profile', data);
  });
});

router.get('/:userId/edit', (req, res, next) => {
  const { userId } = req.params;
  //console.log(userId);
  User.findById(userId).then(user => {
    //console.log(data);
    res.render('profile-edit', user);
  });
});

//create middleware for image upload

router.post('/:userId/edit', uploader.single('photo'), (req, res, next) => {
  const userId = req.params.userId;
  //console.log(req.file);
  // const userId = req.user._id;
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
