'use strict';

const { Router } = require('express');
const router = new Router();

const Project = require('../models/project');
const Comment = require('../models/comment');
const Like = require('../models/like');
const routeGuard = require('../middleware/route-guard');
const uploader = require('../middleware/upload');

//routers for create a project
router.get('/create', routeGuard, (req, res, next) => {
  res.render('create-project');
});

router.post('/create', uploader.single('photo'), (req, res, next) => {
  const userId = req.user._id;

  const { title, description, tagline, category, netlify } = req.body;
  const author = userId;
  const { url } = req.file;

  Project.create({
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

//add a like
router.post('/:projectId/like', routeGuard, (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user._id;
  Like.create({
    projectId: projectId,
    likerId: userId
  })
    .then(data => {
      console.log('end data:', data);
      res.redirect(`/project/${projectId}`);
    })
    .catch(error => {
      next(error);
    });
});

//routers for edit a project
router.get('/:projectId/edit', routeGuard, (req, res, next) => {
  const projectId = req.params.projectId;
  Project.findById(projectId)
    .then(projectData => {
      console.log('here', projectData);
      res.render('edit-project', projectData);
    })
    .catch(error => console.log(error));
});

router.post('/:projectId/edit', uploader.single('photo'), (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.params.projectId;
  const { title, description, tagline, category, netlify } = req.body;

  console.log('User', req.body.category);

  let profilePicture;
  if (req.file) {
    profilePicture = req.file.url;
  }

  Project.findByIdAndUpdate(projectId, {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(tagline ? { tagline } : {}),
    ...(category ? { category } : {}),
    ...(netlify ? { netlify } : {}),
    ...(profilePicture ? { profilePicture } : {})
  })
    .then(data => {
      console.log('end data:', data);
      res.redirect(`/profile/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});

//router for delete a project
router.post('/:projectId/delete', (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.params.projectId;
  console.log(userId, projectId);

  Project.findByIdAndDelete(projectId)
    .then(project => {
      res.redirect(`/profile/${userId}`);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:projectId/comment', (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.params.projectId;
  const { content } = req.body;

  Comment.create({
    author: userId,
    post: projectId,
    content
  })
    .then(comment => {
      console.log('Commment', comment);
      res.redirect(`/project/${comment.post}`);
    })
    .catch(error => {
      next(error);
    });
});

//routers for show the game
router.get('/:projectId', (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user._id;
  //This line 👆🏼 is equal to typing  const { userId } = req.params;
  Project.findById(projectId)
    .populate('author')
    .then(projectInfo => {
      Comment.find({ post: projectInfo._id })
        .populate('author')
        .then(comments => {
          Like.find({ projectId: projectInfo._id }).then(likes => {
            const likeLength = likes.length;
            console.log(likeLength);
            let addLike = likes.filter((val, index) => {
              if (val.likerId.toString() === userId.toString()) {
                return val;
              }
            });
            console.log('addLike', addLike);

            let newLike;

            if (addLike.length === 0) {
              newLike = true;
            } else {
              newLike = false;
            }

            console.log(newLike, 'Checklike');

            res.render('project', { projectInfo, comments, likeLength, newLike });
          });
        });
    })
    .catch(error => console.log(error));
});

module.exports = router;
