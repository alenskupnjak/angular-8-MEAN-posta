const path = require('path');
const express = require('express');
const dotenv = require('dotenv'); // Load config file
const bodyParser = require('body-parser'); // bez ovoga ne mozemo slati podatke u req.body
const mongoose = require('mongoose');
const colors = require('colors');

const cookieParser = require('cookie-parser');
// const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');
// let hpp = require('hpp');
const cors = require('cors');
// const morgan = require('morgan');
// const fileUpload = require('express-fileupload');

// const errorHandlerSvi = require('./middleware/error');

// START express (NODE), inicijalizacija aplikacije
console.log(colors.bgRed('START START START'));
const app = express();

// definiramo path za file u koji spremamo potrebne varijable
dotenv.config({ path: '.vscode/config.env' });




console.log('proceas.env.JWT_SECRET_WORD=',process.env.JWT_SECRET_WORD);
console.log('proceas.env.JWT_COOKIE_EXPIRE=',process.env.JWT_COOKIE_EXPIRE);
console.log('proceas.env.JWT_EXPIRE=',process.env.JWT_EXPIRE);
console.log('DATABASE=',process.env.DATABASE);

// definiranje porta
const port = process.env.PORT || 4401;
console.log('port=',port);

mongoose
  .connect(
    process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      `Spojen na MongoDB, PORT= ${process.env.PORT}`
    );
  })
  .catch((err) => {
    console.log('Ne mogu se spojiti 01'.red);
    console.log(err);
  });

  
// Body parser, bez ovoga ne mozemo slati podatke u req.body , starija verzija!!!!!
// app.use(express.json());
// // isto kao i app.use(express.json());  nova verzija
app.use(bodyParser.json());

// SETUP Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS,GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// body -parser, bez ovoga ne salje podatke automatski kroz req.body (npm i body-parser)
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parser, za slanje TOKENA
app.use(cookieParser());

// ako udes u path sa slikama /images, idi na stazu
app.use('/images', express.static(path.join(__dirname, 'images')));

//  ROUTE routs path files
const postsRoutes = require('./routes/postsRoutes');
const userRouter = require('./routes/userRoutes');

//
// pokusni middeleware
app.use((req, res, next) => {
  req.pozdravnaporuka = 'pocetna vrijednost';
  res.postman = req.body;
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
});

// // definiramo template engine koji cemo koristiti u aplikaciji (EJS ili PUG ili express-handlebars)
// // app.set('view engine', 'pug'); // za pug
// app.set('view engine', 'ejs'); // za ejs
// // kreiramo stazu odakle cemo vuci template
// app.set('views', path.join(__dirname, 'views'));

// // MIDDLEWARE, pokusni
// app.use(logger);

// // Dev logging middleware
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// // File upload
// app.use(fileUpload());

// // Sanitize data, zastita podataka
// app.use(mongoSanitize());

// // Set security headers
// app.use(helmet());

// // Prevent XSS attacks
// app.use(xss());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });

// //  apply to all requests
// // app.use(limiter);

// // Prevent http param pollution
// app.use(hpp());

// Enable CORS
app.use(cors());

// // Set static folder, folder gdje se spremaju svi fileovi
// app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/posts', postsRoutes);
app.use('/api/user', userRouter);
app.use('/', (req, res, next) => {
  res.json({
    message: ' Evo me na AZURE...radim :), pozdrav.',
  });
});



// kreiramo server zahtijeve koji stizu
const server = app.listen(port , () => {
  console.log(`App listening on port ${process.env.PORT }`.blue);
});

// // zatvar program
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`.bgRed);
//   // Close server an exit process
//   server.close(() => {
//     process.exit(1);
//   });
// });


