'use strict';

const { Router } = require('express');
const router = new Router();

const Game = require('../models/game');

const routeGuard = require('./../middleware/route-guard');
const uploader = require('./../middleware/upload');

router.get('/create', routeGuard, (req,res,next) => {
  res.render('create-game');
});



router.post('/create', uploader.single('photo'), (req, res, next) => {
  
  const userId = req.user._id
  
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
}
);

router.get('/:gameId/edit', routeGuard, (req,res,next) => {
  const gameId = req.params.gameId
  Game.findById(gameId)
  .then(gameData =>{
    res.render('edit-game',gameData);
  })
  .catch(error => console.log(error));
});

router.post('/:gameId/edit', uploader.single('photo'), (req, res, next) => {
  
  const userId = req.user._id
  const gameId = req.params.gameId
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


router.post('/:gameId/delete', (req, res, next) => {

  const userId = req.user._id
  const gameId = req.params.gameId
  console.log(userId, gameId)
  
  Game.findByIdAndDelete(gameId)
    .then(() => {
      res.redirect(`/profile/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});


module.exports = router;