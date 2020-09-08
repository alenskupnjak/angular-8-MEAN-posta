const express = require('express');
const Post = require('../models/post');
const router = express.Router();




//
// POST, dodavanje zappisa u BAZU
router.post('', (req, res, next) => {
  // kreiramo post
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  // snimimo podatak u BAZU
  post.save();

  res.status(201).json({
    message: 'Uspjeh',
    data: post,
  });
});

//
// PUT
router.put('/:id', (req, res, next) => {
  // kreiramo novi post kojim cemo pregaziti postojeci
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  // radimo update posta...
  Post.updateOne({ _id: req.params.id }, post).then((data) => {
    console.log(data);
    res.status(201).json({
      message: 'Update uspio',
      data: post,
    });
  });
});

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
