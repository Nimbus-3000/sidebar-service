DROP KEYSPACE IF EXISTS nimbus;
CREATE KEYSPACE nimbus WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
USE nimbus;

CREATE TABLE genre(
    genre_type VARCHAR,
    song_id INT,
    song_name VARCHAR,
    song_user_id INT,
    song_likes INT,
    song_reposts INT, 
    song_plays INT,
    song_comments INT,
    relatedPlaylist VARCHAR,
    song_image_url VARCHAR,
    PRIMARY KEY(genre_type,song_id)
);

CREATE TABLE playlists(
    playlist_genre_type VARCHAR,
    playlist_id INT,
    playlist_name VARCHAR,
    playlist_likes INT,
    playlist_reposts INT,
    user_id INT,
    playlist_image_url VARCHAR,
    PRIMARY KEY(playlist_genre_type, playlist_id)
);

CREATE TABLE user(
    user_id INT,
    user_name VARCHAR,
    user_location VARCHAR,
    user_followers VARCHAR,
    user_image_url VARCHAR,
    PRIMARY KEY(user_id)
);
