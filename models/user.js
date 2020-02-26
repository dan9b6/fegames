'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  campus: {
    type: String,
    enum: [
      'Amsterdam',
      'Lisbon',
      'Madrid',
      'Miami',
      'Barcelona',
      'Mexico City',
      'Berlin',
      'Sao Paulo',
      'Paris'
    ]
  },
  githubToken: {
    type: String
  },
  profilePicture: {
    type: String,
    default:
      'https://res.cloudinary.com/dsys9z0jc/image/upload/v1582547999/fegames/avatar_hynht3.jpg'
  }
});

module.exports = mongoose.model('User', schema);
