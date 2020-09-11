const multer = require('multer');
const fs = require('fs');


//
// MULER MULTER
// za spremanje fileova
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};
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


module.exports = multer({ storage: storage }).single('image')