const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// kreirane komponente
const Post = require('../models/postModel');
const User = require('../models/userModel');

//*****************************
// POST /api/user/signup
// SIGN UP
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
          message: 'Uspješno kreiran korisnik',
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

//*****************************
// POST /api/user/login
// LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
router.post('/login', (req, res, next) => {
  let userLogin;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          pozicija: 'router.post',
          message: 'Autorizacija nije uspjela xx',
        });
      }
      // treba nam ovaj podatak da mozemo poslat u jwt.sign userId
      userLogin = user;
      // usporedujemo upisani password sa hasa-passwordom u bazi
      // rezultat je TRUE ili FALSE
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      // TRUE il FALSE
      if (!result) {
        return res.status(401).json({
          pozicija: 'router.post',
          message: 'Autorizacija nije uspjela yyyy',
        });
      }
      console.log('process.env', process.env.JWT_SECRET_WORD, userLogin);

      // kreiramo token
      const token = jwt.sign(
        { email: userLogin.email, userId: userLogin._id },
        process.env.JWT_SECRET_WORD,
        { expiresIn: process.env.JWT_EXPIRE }
      );
      console.log('userLogin'.bgRed, userLogin);

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        loginUser: userLogin._id,
        loginUserName: userLogin.email,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Usjeh: 'NE',
        message: 'Autorizacija nije uspjela yyyy',
      });
    });
});

module.exports = router; // dolazi kod svakog routera!!!
