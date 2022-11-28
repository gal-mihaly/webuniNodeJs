const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');


const router = require('./routes');

const initDb = require('./services/dbService');

const app = express();
app.use(
  session({
    secret: 'azenszupertitkosjelszavam',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static('dist'));

app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use('/js', express.static('./node_modules/jquery/dist'));

app.set('pages', path.join(__dirname, '../views/pages'));
app.set('components', path.join(__dirname, '../views/components'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


initDb((err, {userModel, twiteModel, saveDB }) => {

  if(err) {
    return console.log('Unable to start application', err);
  }


  if(process.env.NODE_ENV !== "PRODUCTION") {
    console.log('users:');
    console.table(userModel.find());

    console.log('twites:')
    console.table(twiteModel.find());
  }

  app.use('/', router({ userModel, twiteModel, saveDB, uuidv4  }));
  
  const server = app.listen(7000, () => {
    console.log(`The application started on port ${server.address().port}`);
  });


})

