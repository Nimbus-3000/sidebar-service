COPY songs(song_name, song_plays, song_comments, song_image_url, song_genre, id_playlist, id_user) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/postgres/song.csv' DELIMITER',' CSV HEADER;

COPY users(user_name, user_imageUrl, user_location, user_follower_count) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/postgres/users.csv' DELIMITER',' CSV HEADER;

COPY playlists(playlist_name, playlist_likes, playlist_reposts, playlist_image_url, playlist_genre, id_users) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/postgres/playlist.csv' DELIMITER',' CSV HEADER;

COPY songsInPlaylist(id_playlist, id_songs) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/postgres/songsInPlaylist.csv' DELIMITER',' CSV HEADER;

COPY likes(id_songs, id_users) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/postgres/likes.csv' DELIMITER',' CSV HEADER;

COPY reposts(id_songs, id_users) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/postgres/reposts.csv' DELIMITER',' CSV HEADER;

--Foreign Keys
ALTER TABLE songs ADD CONSTRAINT songPlaylist FOREIGN KEY (id_playlist) REFERENCES playlists (id);

ALTER TABLE songs ADD CONSTRAINT songUser FOREIGN KEY (id_user) REFERENCES users (id);

ALTER TABLE playlists ADD CONSTRAINT playlistUser FOREIGN KEY (id_users) REFERENCES users (id);

ALTER TABLE songsInPlaylist ADD CONSTRAINT songPlaylist FOREIGN KEY (id_playlist) REFERENCES playlists (id);

ALTER TABLE songsInPlaylist ADD CONSTRAINT songSong FOREIGN KEY (id_songs) REFERENCES songs (id);

ALTER TABLE likes ADD CONSTRAINT likeSong FOREIGN KEY (id_songs) REFERENCES songs (id);

ALTER TABLE likes ADD CONSTRAINT likeUser FOREIGN KEY (id_users) REFERENCES users (id);

ALTER TABLE reposts ADD CONSTRAINT repostSong FOREIGN KEY (id_songs) REFERENCES songs (id);

ALTER TABLE reposts ADD CONSTRAINT repostUser FOREIGN KEY (id_users) REFERENCES users (id);
