const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const Controller = require('./Controller.js');

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/songs/:songId/related', (req, res) => {
  Controller.getRelatedSong(req, res);
})

app.get('/songs/:songId/relatedPlaylist', (req, res) => {
  Controller.getRelatedPlaylist(req, res);
});

app.listen(port, () => console.log(`Nimbus listening at http://localhost:${port}`))