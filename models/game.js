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
    photo: {
      type: String
    },
    netlify: {
      type: String
    },
    category: {
      type: String,
      enum: ['Game Project','App Project','Final Project']
    },
    tagline: {
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

module.exports = mongoose.model('Post', schemaGame);
