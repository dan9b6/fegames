'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Projects = require('./../models/project');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'codeIRON' });
});

router.get('/select', (req, res, next) => {
  res.render('select');
});

router.get('/home', routeGuard, (req, res, next) => {
  const userId = req.user._id;
  Projects.find()
    .then(projects => {
      console.log(projects);
      projects.map(project => {
        if (userId.toString() === project.author.toString()) {
          console.log('condition true');
          project.sameUser = true;
        } else {
          console.log('condition false');
          project.sameUser = false;
        }
      });
      res.render('home', { projects });
    })
    .catch(error => next(error));
});

module.exports = router;
