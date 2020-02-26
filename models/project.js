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
      maxlength: 200
    },
    like: {
      type: Number,
      default: 0
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
