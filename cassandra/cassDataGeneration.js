const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cliProgress = require('cli-progress');
const faker = require('faker');

// CONSTANT NUMBERS
const SONG_COUNT = 1e7; //1e7;
const PLAYLIST_COUNT = 5e5; //5e2;
const USER_COUNT = 1e7;

// GENERATION FUNCTIONS CONSTANTS TO BE MULTIPLIED BY 1000
const SONG_GENERATIONS = 1e4; //1e4;
const PLAYLIST_GENERATIONS = 5e2; //5e2;
const USER_GENERATIONS = 1e4;

// definition of writers
const genreWriter = createCsvWriter({
  path: './cassSong.csv',
  header: [
    {id: 'genre_type', title: 'GENRE_TYPE'},
    {id: 'song_id', title: 'SONG_ID'},
    {id: 'song_name', title: 'SONG_NAME'},
    {id: 'song_user_id', title: 'SONG_USER_ID'},
    {id: 'song_likes', title: 'SONG_LIKES'},
    {id: 'song_reposts', title: 'SONG_REPOSTS'},
    {id: 'song_plays', title: 'SONG_PLAYS'},
    {id: 'song_comments', title: 'SONG_COMMENTS'},
    {id: 'relatedPlaylist', title: 'RELATEDPLAYLIST'},
    {id: 'song_image_url', title: 'SONG_IMAGE_URL'},
  ]
  });

const playlistWriter = createCsvWriter({
  path: './cassPlaylists.csv',
  header: [
    {id: 'playlist_genre_type', title: 'PLAYLIST_GENRE_TYPE'},
    {id: 'playlist_id', title: 'PLAYLIST_ID'},
    {id: 'playlist_name', title: 'PLAYLIST_NAMES'},
    {id: 'playlist_likes', title: 'PLAYLIST_LIKES'},
    {id: 'playlist_reposts', title: 'PLAYLIST_REPOSTS'},
    {id: 'user_id', title: 'USER_ID'},
    {id: 'playlist_image_url', title: 'PLAYLIST_IMAGE_URL'}
  ]
});

const userWriter = createCsvWriter({
  path: './cassUser.csv',
  header: [
    {id: 'user_id', title: 'USER_ID'},
    {id: 'user_name', title: 'USER_NAME'},
    {id: 'user_location', title: 'USER_LOCATION'},
    {id: 'user_followers', title: 'USER_FOLLOWERS'},
    {id: 'user_image_url', title: 'USER_IMAGE_URL'}
  ]
});


// bars -----------------------------------

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar3 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// helper functions and variables ---------------------
const randRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const genres = ['hip-hop', 'rap', 'country', 'alternative', 'edm', 'indi', 'rock', 'soft-rock'];

// creating my arrays of 
let songId = 1;
let playlistId = 1;
let userId = 1;

const generateCassSongs = () => {
  const songs = [];
  for(let i = 0; i < SONG_GENERATIONS; i++){
    const song = {};
    song.genre_type = genres[randRange(0, genres.length - 1)];
    song.song_id = songId;
    song.song_name = `${faker.lorem.words()}`;
    song.song_user_id = randRange(1, USER_COUNT);
    song.song_likes = randRange(1, 10000);
    song.song_reposts = randRange(1, 10000);
    song.song_plays = randRange(1, 10000);
    song.song_comments = randRange(1, 10000);
    song.relatedPlaylist = randRange(1, PLAYLIST_COUNT);
    song.song_image_url = `${faker.image.image()}`;
    songs.push(song);
    bar.increment();
    songId++
  }
  return songs;
}

const generateCassPlaylists = () => {
    const playlists = [];
    for(let i = 0; i < PLAYLIST_GENERATIONS; i++){
        const playlist = {};
        playlist.playlist_genre_type = genres[randRange(0, genres.length - 1)];
        playlist.playlist_id = playlistId;
        playlist.playlist_name = `${faker.lorem.words()}`;
        playlist.playlist_likes = randRange(1, 10000);
        playlist.playlist_reposts = randRange(1, 10000);
        playlist.user_id = randRange(1, USER_COUNT);
        playlist.playlist_image_url = `${faker.image.image()}`;
        playlists.push(playlist);
        bar2.increment();
        playlistId++
    }
    return playlists;
}

const generateCassUsers = () => {
    const users = [];
    for(let i = 0; i < USER_GENERATIONS; i++){
        const user = {};
        user.user_id = userId
        user.user_name = `${faker.name.findName()}`;
        user.user_location = `${faker.address.city()}`;
        user.user_followers = randRange(10, 10000);
        user.user_image_url = `${faker.image.avatar()}`;
        users.push(user);
        bar3.increment();
        userId++;
    }
  return users;
}
//CREATION
let songCount = 1000
let userCount = 1000
let playlistCount = 1000

const songsCreation = () => {
  if(songCount !== 0) {
    songCount--;
    let songs = generateCassSongs();
    genreWriter.writeRecords(songs)
      .then(() => {
          songsCreation()
      });
  } else {
    bar.stop();
    console.log('Songs are done');
    // bar2.start(PLAYLIST_COUNT, 0);
    // playlistCreation();
  }
}

const playlistCreation = () => {
  if(playlistCount !== 0) {
    playlistCount--;
    let playlists = generateCassPlaylists();
    playlistWriter.writeRecords(playlists)
      .then(() => {
          playlistCreation()
      });
  } else {
      bar2.stop();
      console.log('Playlists are done');
      bar3.start(USER_COUNT, 0);
      userCreation();
  }
}

const userCreation = () => {
  if(userCount !== 0) {
    userCount--;
    let users = generateCassUsers();
    userWriter.writeRecords(users)
      .then(() => {
          userCreation()
      });
  } else {
      bar3.stop();
      console.log('users are done');
      console.log('SEEDING DONE');
  }
}

bar.start(SONG_COUNT, 0)
songsCreation();