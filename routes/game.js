'use strict';

const { Router } = require('express');
const router = new Router();

const Game = require('../models/game');

const routeGuard = require('./../middleware/route-guard');
const uploader = require('./../middleware/upload');

router.get('/create', routeGuard, (req, res, next) => {
  res.render('create-game');
});

router.post('/create', uploader.single('photo'), (req, res, next) => {
  const userId = req.user._id;

  const { title, description, tagline } = req.body;
  const author = userId;
  const { url } = req.file;

  Game.create({
    title,
    description,
    photo: url,
    author,
    tagline
  })
    .then(post => {
      res.redirect(`/profile/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});

//const uploader = require('./../multer-configure.js');
/*
router.post( '/:channelId/post/create', routeGuard, (req, res, next) => {
    const { title, description, photo, tagline } = req.body;
    const author = req.user._id;

    Game.create({
      title,
      description,
      photo,
      author,
      tagline,
    })
      .then(post => {
        //res.redirect(`/${post.channel}/post/${post._id}`);
      })
      .catch(error => {
        //next(error);
      });
  }
);
*/
module.exports = router;
