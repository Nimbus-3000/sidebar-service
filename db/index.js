const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sidebarcomponent', {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error ', err);
  })
  db.on('connected', function () {
    console.log('leggo mongoo');
  })
  db.on('disconnected', function () {
    console.log('mongo disconnected');
  })

module.exports = db;