'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const Projects = require('./../models/project');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'codeIRON' });
});

router.get('/home', routeGuard, (req, res, next) => {
  const userId = req.user._id;
  const category = req.query.category;
  const campus = req.query.campus;

  console.log('campus', campus);

  Projects.find()
    .then(allProjects => {
      // console.log(allProjects);
      const projects = allProjects
        .map(project => {
          if (userId.toString() === project.author.toString()) {
            // console.log('condition true');
            project.sameUser = true;
            return project;
          } else {
            // console.log('condition false');
            project.sameUser = false;
            return project;
          }
        })
        .filter(project => {
          if (category) {
            if (category === 'All Projects') {
              return true;
            } else return project.category === category;
          } else return true;
        })
        .filter(project => {
          if (campus) {
            if (campus === 'All Campus') {
              return true;
            } else return project.campus === campus;
          } else return true;
        });
      res.render('home', { projects });
    })
    .catch(error => next(error));
});

module.exports = router;
