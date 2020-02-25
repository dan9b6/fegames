'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Projects = require('./../models/project');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'codeIRON' });
});

router.get('/home', routeGuard, (req, res, next) => {
<<<<<<< HEAD
  const userId = req.user._id
  Projects.find()
    .then(projects => {
      console.log(projects);
      projects.map(project =>{
        if (userId.toString() === project.author.toString()) {
          console.log("condition true");
          project.sameUser = true
        } else {
          console.log("condition false");
          project.sameUser = false
=======
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
>>>>>>> 4090b029647409b7eac13599cb6e1bf2a541b143
        }
      })
      res.render('home', { projects });
    })
    .catch(error => next(error));
});

module.exports = router;
