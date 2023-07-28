const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();


app.set('port', 3000);
app.listen(app.get('port'), () => {
  console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});

app.set('port', 3000);

mongoose.connect('mongodb://localhost:8080/vue-app-store', { useNewUrlParser: true })
  .then(db => console.log('[OK] DB is connected')).
  catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));