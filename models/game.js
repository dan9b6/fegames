'use strict';
const mongoose = require('mongoose');
const schemaGame = new mongoose.Schema(
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
    photo: 
      {
        type: String
      },
    tagline:
    {
      type: String,
      maxlength: 70
    } 
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);
const Model = mongoose.model('Post', schemaGame);
module.exports = Model;