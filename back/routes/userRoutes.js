const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');


// CREATE
router.post('/signup', UserController.createUser); //

// LOGIN
router.post('/login', UserController.loginUser);  



module.exports = router; // dolazi kod svakog routera!!!
