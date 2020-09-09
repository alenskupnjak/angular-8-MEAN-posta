const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const colors = require('colors');

// ta rad u MULTER
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

//
// MULER MULTER
// za spremanje fileova
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('LALALAL');

    // podesavamo da vidimo dali je file ispravne extenzije
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    // ako je pronasao jedno od navedenih 3 extenzija, SET error = null
    if (isValid) {
      error = null;
    }
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    console.log('tu sam -------------------');
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    console.log('ime=', name + '-' + '.' + ext);
    cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

// // MULER MULTER MULER MULTER
// // filtriramo extenzije slika koje mozemo koristiti u programu
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

//
// POST, dodavanje zappisa u BAZU
//
router.post(
  '',
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    console.log(req.body);

    // kreiramo post
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      imagePathRelative: 'images/' + req.file.filename,
    });

    // snimimo podatak u BAZU
    post.save().then((createdPost) => {
      res.status(201).json({
        message: 'Uspjeh',
        podatak: {
          id: createdPost._id,
          title: createdPost.title,
          content: createdPost.content,
          imagePath: createdPost.imagePath,
          imagePathRelative: createdPost.imagePath,
        },
      });
    });
  }
);

//
// PUT
//
router.put(
  '/:id',
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    console.log(req.body);
    console.log('req.file', req.file);
    const url = req.protocol + '://' + req.get('host');
    // kreiramo novi post kojim cemo pregaziti postojeci
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      imagePathRelative: 'images/' + req.file.filename,
    });

    // radimo update posta...
    Post.updateOne({ _id: req.params.id }, post).then((data) => {
      console.log(data);
      // obrisi file
      console.log('tototot');

      // fs.unlink(
      //   'images/' + req.file.filename,
      //   (err) => {
      //     try {
      //       console.log('Obrisao file cc');
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // );

      res.status(201).json({
        message: 'Update uspio',
        data: post,
      });
    });
  }
);

//
// GET (ist kao i use get)
// PATH: '/'
router.get('', (req, res, next) => {
  const pageSize = parseInt(req.query.pagesize); // vrijednost je uvijek string
  const currentPage = parseInt(req.query.page);
  // Inicijaliziramo pocetno stanje query kojeg mozemo obradivatu u lancu zahtijeva
  // od njega krecemo i ratimo operacije, na kraju se poziva sam query.find
  const postQuery = Post.find();
  let fetchedPosts; // treba nam jer moramo pronaci broj dokumenata

  console.log('req.query='.blue, req.query);
  console.log('ostQuery='.green, postQuery);
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1)) // mongoose funkcija, preskace broj zapisa u bazi
      .limit(pageSize);
  }
  const fetchPost = postQuery.then((data) => {
    return Post.count();
  });

  // nakon obrade svih query-a krecemo dalje u rad
  // console.log('ostQuery='.bgBlue, postQuery);
  postQuery
    .then((data) => {
      console.log('data'.bgBlue, data);
      fetchedPosts = data;
      return Post.count();
    })
    .then((brojDokumenata) => {
      res.status(200).json({
        message: 'Uspjesno dohvaceni podaci iz baze',
        brojDokumenata: brojDokumenata,
        posts: fetchedPosts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//
// DELETE POST
// /:id
router.delete('/:id', (req, res, next) => {
  Post.find({ _id: req.params.id })
    .then((data) => {
      console.log('datadelete----', data);
      console.log('datadelete', data[0].imagePathRelative);

      // brišem file koji imam u direktoziju
      fs.unlink(data[0].imagePathRelative, (err) => {
        try {
          console.log('Obrisao file cc');
        } catch (error) {
          console.log(error);
        }
      });

      return data[0].id;
    })
    .then((data) => {
      Post.deleteOne({ _id: data }).then((data) => {
        console.log('Posta obrisana BACKEND');
        res.status(200).json({
          message: 'Posta uspješno obrisana',
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
