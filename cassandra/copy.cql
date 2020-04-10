COPY genre(genre_type, song_id, song_name, song_user_id, song_likes, song_reposts, song_plays, song_comments, relatedPlaylist, song_image_url) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/cassandra/cassSong.csv' WITH DELIMITER=',' AND HEADER=TRUE;

COPY playlists(playlist_genre_type, playlist_id, playlist_name, playlist_likes, playlist_reposts, user_id, playlist_image_url) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/cassandra/cassPlaylists.csv' WITH DELIMITER=',' AND HEADER=TRUE;

COPY user(user_id, user_name, user_location, user_followers, user_image_url) FROM '/Users/Jono/Desktop/HackReactor/sidebar-service/cassandra/cassUser.csv' WITH DELIMITER=',' AND HEADER=TRUE;
