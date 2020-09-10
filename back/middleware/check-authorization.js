const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.body);
    console.log('Cookies: ', req.cookies)
    
    console.log('req.headers.authorization===',req.headers);
    console.log('req.headers.authorization===',req.headers.authorization);
    console.log('req.pozdravnaporuka ===',req.pozdravnaporuka );
    res.podatak = 'podatak'

    const token = req.headers.authorization.split(" ")[1];
    console.log('***************************');
    
    
    jwt.verify(token, process.env.JWT_SECRET_WORD);
    console.log(token);
    next();
    // console.log(token);
  } catch (error) {
    console.log('Nije Autoriziran');
    res.status(401).json({ message: "Auth failed!" });
  }
};
