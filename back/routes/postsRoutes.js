const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const colors = require('colors');

const checkAuth = require('../middleware/check-authorization');
const Post = require('../models/postModel');

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
  checkAuth,
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    console.log(req.userData);

    // kreiramo post
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      imagePathRelative: 'images/' + req.file.filename,
      creator: req.userData.userId,
    });

    // snimimo podatak u BAZU
    post
      .save()
      .then((createdPost) => {
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
      })
      .catch((err) => {
        console.log('Graška kod snimanja podataka');
        console.log(err);
      });
  }
);

//
// UPDATE
//
router.put(
  '/:id',
  checkAuth,
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    let imagePathRelative;

    if (imagePath) {
      const regex = /images/g;
      const indexImage = imagePath.search(regex);
      imagePathRelative = imagePath.slice(indexImage);
    }
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
      imagePathRelative = 'images/' + req.file.filename;
    }

    // kreiramo novi post kojim cemo pregaziti postojeci
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      imagePathRelative: imagePathRelative,
      creator: req.userData.userId
    });

    Post.findOne({ _id: req.params.id, creator: req.userData.userId })
      .then((data) => {
        console.log(data, !data);

        if (!data) {
          res.status(401).json({
            message: 'Ovaj korisnik autor ove poste, UPDATE',
          });
        }
        // brišem stari file samo ako je je selektiran novi file
        if (req.file) {
          fs.unlink(res.imagePathRelative, (err) => {
            try {
              console.log('Obrisao file Prilikom Update');
            } catch (error) {
              console.log(error);
            }
          });
        }
        return data;
      })
      .then((data) => {
        if (!data) {
          return res.status(401).json({
            message: 'Ovaj korisnik nije autor ove poste, UPDATE',
          });
        }
        // radimo update posta...
        Post.updateOne({ _id: req.params.id }, post).then((data) => {
          console.log('Update uspio'.green);
          res.status(201).json({
            message: 'Update uspio',
            data: post,
          });
        });
      })
      .catch((err) => {
        console.log('Neuspio update');
        console.log(err);
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

  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1)) // mongoose funkcija, preskace broj zapisa u bazi
      .limit(pageSize);
  }
  const fetchPost = postQuery.then((data) => {
    return Post.countDocuments();
  });

  // nakon obrade svih query-a krecemo dalje u rad
  // console.log('ostQuery='.bgBlue, postQuery);
  postQuery
    .then((data) => {
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
router.delete('/:id', checkAuth, (req, res, next) => {
  Post.find({ _id: req.params.id, creator: req.userData.userId })
    .then((data) => {
      if (data.length === 0) {
        res.status(401).json({
          message: 'Ovaj korisnik nije autor ove poste, DELETE',
        });
      }
      console.log('datadelete---------------------');
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
      console.log('nesupjelo brisanje!');
      console.log(err);
    });
});

module.exports = router; // dolazi kod svakog routera!!!
