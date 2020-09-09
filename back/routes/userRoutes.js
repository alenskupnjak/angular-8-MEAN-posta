const express = require('express');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hashPassword) => {
    const user = new User({
      email: req.body.email,
      password: hashPassword,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: 'Uspješno kreirana lozinka',
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

module.exports = router; // dolazi kod svakog routera!!!
