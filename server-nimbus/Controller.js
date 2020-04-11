const Models = require('../postgres/index.js');

const getRelatedSong = (req, res) => {
  let {songId} = req.params;
  console.log(songId);
  Models.getRelatedSong(songId, (err, data) => {
    if(err){
      res.status(404).send();
    } else {
      res.send(data.rows);
    }
  });
};

const getRelatedPlaylist = (req, res) => {
  let {songId} = req.params;
  console.log(songId);
  Models.getRelatedPlaylist(songId, (err, data) => {
    if(err){
      res.status(404).send();
    } else {
      res.send(data.rows);
    }
  });
};

module.exports = { getRelatedSong, getRelatedPlaylist }