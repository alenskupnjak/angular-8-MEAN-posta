const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('Korisnik je Atoriziran');

    // ako baci grešku ide u catch....
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_WORD);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };
    console.log(decodedToken);
    next();
    // console.log(token);
  } catch (error) {
    console.log('Nije Autoriziran');
    res.status(401).json({ message: 'Auth failed!' });
  }
};
