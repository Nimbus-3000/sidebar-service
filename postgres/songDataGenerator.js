const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cliProgress = require('cli-progress');
const faker = require('faker');

// headers for all mt SQL tables
const songWriter = createCsvWriter({
  path: './songs.csv',
  header: [
    {id: 'song_name', title: 'SONG_NAME'},
    {id: 'artist_name', title: 'ARTIST_NAME'},
    {id: 'artist_location', title: 'LOCATION'},
    {id: 'artist_followers', title: 'ARTIST_NAME'},
    {id: 'song_plays', title: 'ARTIST_NAME'},
    {id: 'song_comments', title: 'ARTIST_NAME'},
    {id: 'artist_image_url', title: 'ARTIST_NAME'},
    {id: 'song_image_url', title: 'ARTIST_NAME'},
    {id: 'song_genre', title: 'GENRE'},
    {id: 'id_playlist', title: 'ID_PLAYLIST'}
  ]
});

const userWriter = createCsvWriter({
  path: './users.csv',
  header: [
    {id: 'user_name', title: 'USER_NAME'},
    {id: 'user_imageUrl', title: 'USER_IMAGEURL'},
    {id: 'user_location', title: 'USER_LOCATION'},
    {id: 'user_follower_count', title: 'USER_FOLLOWER_COUNT'},
  ]
});

const playlistWriter = createCsvWriter({
  path: './playlist.csv',
  header: [
    {id: 'playlist_name', title: 'PLAYLIST_NAME'},
    {id: 'playlist_likes', title: 'PLAYLIST_LIKES'},
    {id: 'playlist_reposts', title: 'PLAYLIST_REPOSTS'},
    {id: 'playlist_image_url', title: 'PLAYLIST_IMAGE_URL'},
    {id: 'playlist_genre', title: 'PLAYLIST_GENRE'},
    {id: 'id_users', title: 'ID_USERS'},
  ]
});

// all the bars ----------------------
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar3 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// helper functions and variables ------------------
const randRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const genres = ['hip-hop', 'rap', 'country', 'alternative', 'edm', 'indi', 'rock', 'soft-rock'];

// creating my array of objects --------------------
const generateSongs = () => {
  const songs = [];
  for(let i = 0; i < 1000; i++){
    const song = {};
    song.song_name = `${faker.lorem.words()}`;
    song.artist_name = `${faker.name.findName()}`;
    song.artist_location = `${faker.address.city()}`;
    song.artist_followers = randRange(10000, 100000);
    song.song_plays = randRange(10000, 100000);
    song.song_comments = randRange(10000, 100000);
    song.artist_image_url = `${faker.image.avatar()}`;
    song.song_image_url = `${faker.image.image()}`;
    song.song_genre = genres[randRange(0, genres.length -1 )];
    song.id_playlist = randRange(1, 1000);
    songs.push(song);
    bar.increment();
  }
  return songs;
};

const generateUsers = () => {
  const users = [];
  for(let i = 0; i < 100000; i++) {
    const user = {};
    user.user_name = `${faker.name.findName()}`;
    user.user_imageUrl = `${faker.image.avatar()}`;
    user.user_location = `${faker.address.city()}`;
    user.user_follower_count = randRange(100, 1000);
    users.push(user);
    bar2.increment();
  }
  return users;
}

const generatePlaylists = () => {
  const playlists = [];
  for(let i = 0; i < 100; i++) {
    const playlist = {};
    playlist.playlist_name = `${faker.lorem.words()}`;
    playlist.playlist_likes = randRange(1000, 10000);
    playlist.playlist_reposts = randRange(1000, 10000);
    playlist.playlist_image_url = `${faker.image.image()}`;
    playlist.playlist_genre = genres[randRange(0, genres.length - 1)];
    playlist.id_users = randRange(1, 1000);
    playlists.push(playlist);
    bar3.increment();
  }
  return playlists;
}
// CSVing array of objects
let count = 10000

const songsCreation = () => {
  if(count !== 0) {
    count--
    let songs = generateSongs()
    songWriter.writeRecords(songs)
      .then(() => {
        songsCreation()
      });
  } else {
    bar.stop();
    console.log('Songs Done')
  }
};

const userCreation = () => {
  let users = generateUsers();
  userWriter.writeRecords(users);
  bar2.stop();
  console.log('Users Done')
}

const playlistsCreation = () => {
  let playlists = generatePlaylists();
  playlistWriter.writeRecords(playlists)
  bar3.stop();
  console.log('Playlists Done')
}


console.log('Starting');
// bar.start(10000000, 0);
// bar2.start(100000, 0);
bar3.start(100, 0);
// songsCreation();
// userCreation();
playlistsCreation();
