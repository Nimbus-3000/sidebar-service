const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cliProgress = require('cli-progress');
const faker = require('faker');

// CONSTANT NUMBERS FOR TOTAL RECORDS PER TABLE
const SONG_COUNT = 1e7;
const USER_COUNT = 1e7;
const PLAYLIST_COUNT = 5e5;
const TOTAL_SONGS_IN_PLAYLIST_RELATIONSHIPS = 1e6;
const TOTAL_LIKE_COUNT = 2e7; 
const TOTAL_REPOST_COUNT = 2e7;

// GENERATION FUNCTIONS CONSTANTS TO BE MULTIPLIED BY 1000
const SONG_GENERATIONS = 1e4;
const USER_GENERATIONS = 1e4;
const PLAYLIST_GENERATIONS = 5e2;
const SONGS_IN_PLAYLIST_GENERATIONS = 1e3;
const LIKES_GENERATIONS = 2e4;
const REPOSTS_GENERATIONS = 2e4;

// less important numbers
const SONG_PLAYS_MAX = 1e5;
const SONG_PLAYS_MIN = 1e2;
const SONG_COMMENTS_MAX = 1e5;
const SONG_COMMENTS_MIN = 1e2;
const FOLLOWER_COUNT_MAX = 1e5;
const FOLLOWER_COUNT_MIN = 0;
const PLAYLIST_LIKES_MAX = 1e6;
const PLAYLIST_LIKES_MIN = 0;
const PLAYLIST_REPOSTS_MAX = 1e6;
const PLAYLIST_REPOSTS_MIN = 0;


// headers for all mt SQL tables
const songWriter = createCsvWriter({
  path: './song.csv',
  header: [
    {id: 'song_name', title: 'SONG_NAME'},
    {id: 'song_plays', title: 'SONG_PLAYS'},
    {id: 'song_comments', title: 'SONG_COMMENT'},
    {id: 'song_image_url', title: 'SONG_IMAGE_URL'},
    {id: 'song_genre', title: 'SONG_GENRE'},
    {id: 'id_playlist', title: 'ID_PLAYLIST'},
    {id: 'id_user', title: 'ID_USER'}
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

const songsInPlaylistWriter = createCsvWriter({
  path: './songsInPlaylist.csv',
  header: [
    {id: 'id_playlist', title: 'ID_PLAYLIST'},
    {id: 'id_songs', title: 'ID_SONGS'}
  ]
});

const likesWriter = createCsvWriter({
  path: './likes.csv',
  header: [
    {id: 'id_songs', title: 'ID_SONGS'},
    {id: 'id_users', title: 'ID_USERS'}
  ]
});

const repostWriter = createCsvWriter({
  path: './reposts.csv',
  header: [
    {id: 'id_songs', title: 'ID_SONGS'},
    {id: 'id_users', title: 'ID_USERS'}
  ]
})

// all the bars ----------------------
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar3 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar4 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar5 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar6 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// helper functions and variables ------------------
const randRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const genres = ['hip-hop', 'rap', 'country', 'alternative', 'edm', 'indi', 'rock', 'soft-rock'];

// creating my array of objects --------------------
const generateSongs = () => {
  const songs = [];
  for(let i = 0; i < SONG_GENERATIONS; i++){
    const song = {};
    song.song_name = `${faker.lorem.words()}`;
    song.song_plays = randRange(SONG_PLAYS_MIN, SONG_PLAYS_MAX);
    song.song_comments = randRange(SONG_COMMENTS_MIN, SONG_COMMENTS_MAX);
    song.song_image_url = `${faker.image.image()}`;
    song.song_genre = genres[randRange(0, genres.length - 1)];
    song.id_playlist = randRange(1, PLAYLIST_COUNT);
    song.id_user = randRange(1, USER_COUNT)
    songs.push(song);
    bar.increment();
  }
  return songs;
};

// []

const generateUsers = () => {
  const users = [];
  for(let i = 0; i < USER_GENERATIONS; i++) {
    const user = {};
    user.user_name = `${faker.name.findName()}`;
    user.user_imageUrl = `${faker.image.avatar()}`;
    user.user_location = `${faker.address.city()}`;
    user.user_follower_count = randRange(FOLLOWER_COUNT_MIN, FOLLOWER_COUNT_MAX);
    users.push(user);
    bar2.increment();
  }
  return users;
}

const generatePlaylists = () => {
  const playlists = [];
  for(let i = 0; i < PLAYLIST_GENERATIONS; i++) {
    const playlist = {};
    playlist.playlist_name = `${faker.lorem.words()}`;
    playlist.playlist_likes = randRange(PLAYLIST_LIKES_MIN, PLAYLIST_LIKES_MAX);
    playlist.playlist_reposts = randRange(PLAYLIST_REPOSTS_MIN, PLAYLIST_REPOSTS_MAX);
    playlist.playlist_image_url = `${faker.image.image()}`;
    playlist.playlist_genre = genres[randRange(0, genres.length - 1)];
    playlist.id_users = randRange(1, USER_COUNT);
    playlists.push(playlist);
    bar3.increment();
  }
  return playlists;
}

const generateSongsInPlaylist = () => {
  const songsInPlaylist = [];
  for(let i = 0; i < SONGS_IN_PLAYLIST_GENERATIONS; i++){
    const pair = {};
    pair.id_songs = randRange(1, SONG_COUNT);
    pair.id_playlist = randRange(1, PLAYLIST_COUNT);
    songsInPlaylist.push(pair);
    bar4.increment();
  }
  return songsInPlaylist;
};

const generateLikes = () => {
  const likes = [];
  for(let i = 0; i < LIKES_GENERATIONS; i++){
    const like = {};
    like.id_songs = randRange(1, SONG_COUNT);
    like.id_users = randRange(1, USER_COUNT);
    likes.push(like);
    bar5.increment();
  }
  return likes;
}

const generateReposts = () => {
  const reposts = [];
  for(let i = 0; i < REPOSTS_GENERATIONS; i++){
    const repost = {};
    repost.id_songs = randRange(1, SONG_COUNT);
    repost.id_users = randRange(1, USER_COUNT);
    reposts.push(repost);
    bar6.increment();
  }
  return reposts;
}


// CSVing array of objects
let songCount = 1000
let userCount = 1000
let playlistCount = 1000
let pairCount = 1000
let likesCount = 1000
let repostsCount = 1000

const songsCreation = () => {
  if(songCount !== 0) {
    songCount--
    let songs = generateSongs()
    songWriter.writeRecords(songs)
      .then(() => {
        songsCreation()
      });
  } else {
    bar.stop();
    console.log('Songs Done');
    bar2.start(USER_COUNT, 0); //users
    userCreation();
  }
};

const userCreation = () => {
  if(userCount !== 0) {
    userCount--
    let users = generateUsers();
    userWriter.writeRecords(users)
      .then(() => {
        userCreation()
      });
  } else {
    bar2.stop();
    console.log('Users Done')
    bar3.start(PLAYLIST_COUNT, 0); //playlists
    playlistsCreation();
  }
};

const playlistsCreation = () => {
  if(playlistCount !== 0){
    playlistCount--
    let playlists = generatePlaylists();
    playlistWriter.writeRecords(playlists)
      .then(() =>{
        playlistsCreation()
      });
  } else { 
    bar3.stop();
    console.log('Playlists Done');
    bar4.start(TOTAL_SONGS_IN_PLAYLIST_RELATIONSHIPS, 0); //pairs
    songsInPlaylistCreation();
  }
}

const songsInPlaylistCreation = () => {
  if(pairCount !== 0){
    pairCount--
    let pairs = generateSongsInPlaylist();
    songsInPlaylistWriter.writeRecords(pairs)
      .then(() => {
        songsInPlaylistCreation()
      });
  } else {
    bar4.stop();
    console.log('Pairs Done');
    bar5.start(TOTAL_LIKE_COUNT, 0); //likes
    likesCreation();
  }
}

const likesCreation = () => {
  if(likesCount !== 0){
    likesCount--
    let likes = generateLikes();
    likesWriter.writeRecords(likes)
      .then(() => {
        likesCreation()
      });
  } else {
    bar5.stop();
    console.log('Likes Done');
    bar6.start(TOTAL_REPOST_COUNT, 0); //reposts
    repostsCreation();
  }
}

const repostsCreation = () => {
  if(repostsCount !== 0){
    repostsCount--
    let reposts = generateReposts();
    repostWriter.writeRecords(reposts)
      .then(() => {
        repostsCreation()
      });
  } else {
    bar6.stop();
    console.log('Reposts Done');
    console.log('JOBS DONE!')
  }
}

console.log('Starting');
bar.start(SONG_COUNT, 0); //songs

//THIS STARTS IT ALL
songsCreation();

