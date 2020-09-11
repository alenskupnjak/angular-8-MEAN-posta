const jwt = require('jsonwebtoken');
const colors = require('colors');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('Korisnik je Autoriziran');

    // ako baci grešku ide u catch....
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_WORD);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };
    next();
    // console.log(token);
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated' });
  }
};
