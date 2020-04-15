const Models = require('../postgres/index.js');

const getRelatedSong = (req, res) => {
  let {songId} = req.params;
  Models.getRelatedSong(songId, (err, data) => {
    if(err){
      res.status(404).send();
    } else {
      res.status(200).send(data.rows);
    }
  });
};

const getRelatedPlaylist = (req, res) => {
  let {songId} = req.params;
  Models.getRelatedPlaylist(songId, (err, data) => {
    if(err){
      res.status(404).send();
    } else {
      res.status(200).send(data.rows);
    }
  });
};

module.exports = { getRelatedSong, getRelatedPlaylist }