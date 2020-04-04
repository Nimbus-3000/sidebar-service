\c postgres;

DROP DATABASE IF EXISTS nimbus;

CREATE DATABASE nimbus;

\c nimbus;

CREATE TABLE users (
  id serial NOT NULL,
  user_name VARCHAR(30),
  user_imageUrl VARCHAR(300),
  user_location VARCHAR(30),
  user_follower_count INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE playlists (
  id serial NOT NULL,
  playlist_name VARCHAR(30),
  playlist_likes INTEGER,
  playlist_reposts INTEGER,
  playlist_image_url VARCHAR(300),
  playlist_genre VARCHAR(300),
  id_users INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (id_users) REFERENCES users (id)
);

CREATE TABLE songs (
  id serial NOT NULL,
  song_name VARCHAR(30),
  artist_name VARCHAR(30),
  artist_location VARCHAR(30),
  artist_followers VARCHAR(30),
  song_plays INTEGER,
  song_comments INTEGER,
  artist_image_url VARCHAR(300),
  song_image_url VARCHAR(300),
  song_genre VARCHAR(30),
  id_playlist INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (id_playlist) REFERENCES playlists (id)
);

CREATE TABLE songsInPlaylist(
  id serial NOT NULL,
  playlist_id INTEGER,
  id_songs INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (playlist_id) REFERENCES playlists (id),
  FOREIGN KEY (id_songs) REFERENCES songs (id)
);

CREATE TABLE likes (
  id serial NOT NULL,
  id_songs INTEGER,
  id_users INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (id_songs) REFERENCES songs (id),
  FOREIGN KEY (id_users) REFERENCES users (id)
);

CREATE TABLE reposts (
  id serial NOT NULL,
  id_songs INTEGER,
  id_users INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (id_songs) REFERENCES songs (id),
  FOREIGN KEY (id_users) REFERENCES users (id)
);