\c postgres;

DROP DATABASE IF EXISTS nimbus;

CREATE DATABASE nimbus;

\c nimbus;

CREATE TABLE users (
  id serial NOT NULL,
  user_name VARCHAR(100),
  user_imageUrl VARCHAR(300),
  user_location VARCHAR(100),
  user_follower_count INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE playlists (
  id serial NOT NULL,
  playlist_name VARCHAR(100),
  playlist_likes INTEGER,
  playlist_reposts INTEGER,
  playlist_image_url VARCHAR(300),
  playlist_genre VARCHAR(300),
  id_users INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE songs (
  id serial NOT NULL,
  song_name VARCHAR(100),
  song_plays INTEGER,
  song_comments INTEGER,
  song_image_url VARCHAR(300),
  song_genre VARCHAR(100),
  id_playlist INTEGER,
  id_user INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE songsInPlaylist(
  id serial NOT NULL,
  id_playlist INTEGER,
  id_songs INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE likes (
  id serial NOT NULL,
  id_songs INTEGER,
  id_users INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE reposts (
  id serial NOT NULL,
  id_songs INTEGER,
  id_users INTEGER,
  PRIMARY KEY (id)
);