'use strict';
const mongoose = require('mongoose');
const schemaProject = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 80,
      trim: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    photo: {
      type: String
    },
    netlify: {
      type: String
    },
    category: {
      type: String,
      enum: ['Game Project', 'App Project', 'Last Project']
    },
    tagline: {
      type: String,
<<<<<<< HEAD:models/project.js
      maxlength: 200
=======
      maxlength: 70
    },
    likes: {
      type: Number
>>>>>>> 4090b029647409b7eac13599cb6e1bf2a541b143:models/game.js
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

module.exports = mongoose.model('Post', schemaProject);
