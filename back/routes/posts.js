const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const multer = require('multer');

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
    cb(null, name + '-' + Date.now() +'.' + ext);
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
        },
      });
    });
  }
);

//
// PUT
router.put(
  '/:id',
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    console.log(req.body);
    console.log('req.file',req.file);
    const url = req.protocol + '://' + req.get('host');
    // kreiramo novi post kojim cemo pregaziti postojeci
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename
    });

    // radimo update posta...
    Post.updateOne({ _id: req.params.id }, post).then((data) => {
      console.log(data);
      res.status(201).json({
        message: 'Update uspio',
        data: post,
      });
    });
  }
);

//
// GET (ist kao i use get)
router.get('', (req, res, next) => {
  // posts = [
  //   { id: '01', title: 'Naslov 01', content: 'sadrzaj 01' },
  //   { id: '02', title: 'Naslov 02', content: 'sadrzaj 02' },
  //   { id: '03', title: 'Naslov 03', content: 'sadrzaj 03' },
  // ];
  posts = [];
  Post.find()
    .then((dataPosts) => {
      res.status(200).json({
        message: 'Uspjeh',
        posts: dataPosts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//
// DELETE POST
router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.find({ _id: req.params.id })
    .then((data) => {
      console.log('data', data);
      return data[0].id;
    })
    .then((data) => {
      console.log(data);
      Post.deleteOne({ _id: data }).then((data) => {
        console.log('Posta obrisana BACKEND');
        res.status(200).json({
          message: ' Posta uspješno obrisana',
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
