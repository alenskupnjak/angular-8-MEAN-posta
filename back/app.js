const express = require('express');
const path = require('path');
const dotenv = require('dotenv'); // Load config file
const bodyParser = require('body-parser'); // Body parser, bez ovoga ne mozemo slati podatke u req.body
const mongoose = require('mongoose');
const colors = require('colors');

const Post = require('./models/post');

// const cookieParser = require('cookie-parser');
// const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');
// let hpp = require('hpp');
// const cors = require('cors');
// const morgan = require('morgan');
// const fileUpload = require('express-fileupload');
// const connectDB = require('./config/db');

// const logger = require('./middleware/logger');
// const errorHandlerSvi = require('./middleware/error');

// START express (NODE), inicijalizacija aplikacije
const app = express();

// Body parser, bez ovoga ne mozemo slati podatke u req.body , starija verzija!!!!!
// app.use(express.json());
// // isto kao i app.use(express.json());  nova verzija
app.use(bodyParser.json());
// body -parser, bez ovoga ne salje podatke automatski kroz req.body (npm i body-parser)
app.use(bodyParser.urlencoded({ extended: false }));

// definiramo path za file u koji spremamo potrebne varijable
dotenv.config({ path: '.vscode/config.env' });

// Definicija veze
const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        `${process.env.OS}, Spojen na MongoDB, PORT= ${process.env.PORT}`.yellow
          .bold
      );
      if (process.env.NODE_ENV === 'production') {
        console.log(`Radim u ${process.env.NODE_ENV} modu`.underline.blue);
      } else {
        console.log(`Radim u ${process.env.NODE_ENV}-modu`.underline.blue);
      }
    })
    .catch((err) => {
      console.log('Ne mogu se spojiti'.red);
      console.log(err.name);
    });
};

// Spajanje na bazu
connectDB();

// // Route files
// const bootcampRouter = require('./routes/bootcampsRoter');
// const coursesRouter = require('./routes/coursesRouter');
// const authRouter = require('./routes/authRouter');
// const userRouter = require('./routes/userRouter');
// const reviewsRouter = require('./routes/reviewsRouter');
// const viewRouter = require('./routes/viewRouter');

// SETUP Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//
// POST, dodavanje zappisa u BAZU
app.post('/api/posts', (req, res, next) => {
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
app.put('/api/posts/:id', (req, res, next) => {
  // kreiramo novi post kojim cemo pregaziti postojeci
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  // radimo update posta...
  Post.updateOne({_id:req.params.id}, post).then(data=>{
    console.log(data);
    res.status(201).json({
      message: 'Update uspio',
      data: post,
    });
  })

});

//
// GET (ist kao i use get)
app.get('/api/posts', (req, res, next) => {
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
app.delete('/api/posts/:id', (req, res, next) => {
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

//
// pokusni middeleware
app.use((req, res, next) => {
  req.pozdravnaporuka = 'pocetna vrijednost';
  res.postman = req.body;
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  // console.log(req.get('connection'));
  // console.log(req.get('cookie'));
  // console.log(colors.yellow.inverse(req.body));
  next();
});

console.log(colors.bgRed('START START START'));

// // definiramo template engine koji cemo koristiti u aplikaciji (EJS ili PUG ili express-handlebars)
// // app.set('view engine', 'pug'); // za pug
// app.set('view engine', 'ejs'); // za ejs
// // kreiramo stazu odakle cemo vuci template
// app.set('views', path.join(__dirname, 'views'));

// // Cookie parser, za slanje TOKENA
// app.use(cookieParser());

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
// app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// // Mount routers
// app.use('/api/v1/view', viewRouter);
// app.use('/api/v1/bootcamps', bootcampRouter);
// app.use('/api/v1/courses', coursesRouter);
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/reviews', reviewsRouter);

// // MIDDLEWARE za greske
// app.use(errorHandlerSvi);

// definiranje porta
const PORT = process.env.PORT || 4401;

// kreiramo server zahtijeve koji stizu
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`.blue);
});

// // zatvar program
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`.bgRed);
//   // Close server an exit process
//   server.close(() => {
//     process.exit(1);
//   });
// });
