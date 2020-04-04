const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cliProgress = require('cli-progress');
const faker = require('faker');

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
  for(let i = 0; i < 100; i++){
    const song = {};
    song.song_name = `${faker.lorem.words()}`;
    song.song_plays = randRange(10000, 100000);
    song.song_comments = randRange(10000, 100000);
    song.song_image_url = `${faker.image.image()}`;
    song.song_genre = genres[randRange(0, genres.length -1 )];
    song.id_playlist = randRange(1, 1000);
    song.id_user = randRange(1, 1000)
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
  for(let i = 0; i < 1000; i++) {
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

const generateSongsInPlaylist = () => {
  const songsInPlaylist = [];
  for(let i = 0; i < 100000; i++){
    const pair = {};
    pair.id_playlist = randRange(1, 500000);
    pair.id_songs = randRange(1, 10000000);
    songsInPlaylist.push(pair);
    bar4.increment();
  }
  return songsInPlaylist;
};

const generateLikes = () => {
  const likes = [];
  for(let i = 0; i < 1000; i++){
    const like = {};
    like.id_songs = randRange(1, 10000000);
    like.id_users = randRange(1, 500000);
    likes.push(like);
    bar5.increment();
  }
  return likes;
}

const generateReposts = () => {
  const reposts = [];
  for(let i = 0; i < 1000; i++){
    const repost = {};
    repost.id_songs = randRange(1, 10000000);
    repost.id_users = randRange(1, 500000);
    reposts.push(repost);
    bar6.increment();
  }
  return reposts;
}


// CSVing array of objects
let count = 100

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
  playlistWriter.writeRecords(playlists);
  bar3.stop();
  console.log('Playlists Done')
}

const songsInPlaylistCreation = () => {
  let pairs = generateSongsInPlaylist();
  songsInPlaylistWriter.writeRecords(pairs);
  bar4.stop()
  console.log('Pairs Done')
}

const likesCreation = () => {
  let likes = generateLikes();
  likesWriter.writeRecords(likes);
  bar5.stop();
  console.log('Likes Done')
}

const repostsCreation = () => {
  let reposts = generateReposts();
  repostWriter.writeRecords(reposts);
  bar6.stop();
  console.log('Reposts Done');
}

console.log('Starting');
//bars
bar.start(10000, 0); //songs
bar2.start(100000, 0); //users
bar3.start(100, 0); //playlists
bar4.start(100000, 0); //pairs
bar5.start(1000, 0); //likes
bar6.start(1000, 0); //reposts

//creation calls
songsCreation();
userCreation();
playlistsCreation();
songsInPlaylistCreation();
likesCreation();
repostsCreation();



// COPY users (user_name, user_imageUrl, user_location, user_follower_count) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/postgres/users.csv' DELIMITER',' CSV HEADER;