'use strict';

const { Router } = require('express');
const router = new Router();

const Game = require('../models/game');
const Comment = require('../models/comment');

const routeGuard = require('./../middleware/route-guard');
const uploader = require('./../middleware/upload');

//routers for create a project
router.get('/create', routeGuard, (req, res, next) => {
  res.render('create-game');
});

router.post('/create', uploader.single('photo'), (req, res, next) => {
  const userId = req.user._id;

  const { title, description, tagline, category, netlify } = req.body;
  const author = userId;
  const { url } = req.file;

  Game.create({
    title,
    description,
    photo: url,
    author,
    category,
    netlify,
    tagline
  })
    .then(post => {
      res.redirect(`/profile/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});

//routers for edit a project
router.get('/:gameId/edit', routeGuard, (req, res, next) => {
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .then(gameData => {
      res.render('edit-game', gameData);
    })
    .catch(error => console.log(error));
});

router.post('/:gameId/edit', uploader.single('photo'), (req, res, next) => {
  const userId = req.user._id;
  const gameId = req.params.gameId;
  const { title, description, tagline, category, netlify } = req.body;

  let profilePicture;
  if (req.file) {
    profilePicture = req.file.url;
  }

  Game.findByIdAndUpdate(gameId, {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(tagline ? { tagline } : {}),
    ...(category ? { category } : {}),
    ...(netlify ? { netlify } : {}),
    ...(profilePicture ? { profilePicture } : {})
  })
    .then(() => {
      res.redirect(`/profile/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});

//router for delete a project
router.post('/:gameId/delete', (req, res, next) => {
  const userId = req.user._id;
  const gameId = req.params.gameId;
  console.log(userId, gameId);

  Game.findByIdAndDelete(gameId)
    .then(() => {
      res.redirect(`/profile/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:gameId/comment', (req, res, next) => {
  const userId = req.user._id;
  const gameId = req.params.gameId;
  const { content } = req.body;

  Comment.create({
    author: userId,
    post: gameId,
    content
  })
    .then(comment => {
      console.log('Commment', comment);
      res.redirect(`/game/${comment.post}`);
    })
    .catch(error => {
      next(error);
    });
});

//routers for show the game
router.get('/:gameId', (req, res, next) => {
  const gameId = req.params.gameId;
  //This line 👆🏼 is equal to typing  const { userId } = req.params;
  Game.findById(gameId)
    .populate('author')
    .then(gameInfo => {
      Comment.find({ post: gameInfo._id })
        .populate('author')
        .then(comments => {
          console.log(comments, 'Here');
          res.render('game', { gameInfo, comments });
        });
    })
    .catch(error => console.log(error));
});

module.exports = router;
