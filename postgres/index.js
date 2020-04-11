const { Client } = require('pg');

const client = new Client({
  user: 'Jono',
  host: 'localhost',
  database: 'nimbus'
});

client.connect();

const getRelatedSong = (id, callback) => {
  client.query(`SELECT * FROM songs JOIN users ON songs.id_user = users.id WHERE song_genre = (SELECT song_genre FROM songs WHERE id = ${id}) LIMIT 3`, (err, res) => {
    if(err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

const getRelatedPlaylist = (id, callback) => {
  client.query(`SELECT * FROM playlists JOIN users ON playlists.id = users.id WHERE playlist_genre = (SELECT playlist_genre FROM playlists WHERE id = ${id}) LIMIT 3`, (err, res) => {
    if(err){
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

module.exports = { getRelatedSong, getRelatedPlaylist }