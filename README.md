# sidebar-components overview
This component renders a sidebar module for a music player app page.

# setup 
- run npm install in root directory
- run below scripts in package.json:
  - npm run seed 
  - npm run react-dev
  - npm run server-dev

# API Routes

**Create - Add a related song**
----

* **URL** api/songs/:songId/related/

* **Method:** `POST`
  
*  **URL Params**

   **Required:** `songId=[integer]`

* **Data Params** JSON Object `{
  song_name: String,
  artist_name: String,
  artist_location: String,
  artist_followers: Number,
  song_likes: Number,
  song_reposts: Number,
  song_plays: Number,
  song_comments: Number,
  artist_image_url: String,
  song_image_url: String
}`

* **Success Response:**
 
  * **Code:** 201 Created <br />
    **Content:** `Successfully posted!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unathrorized user, unable to post`

**READ - Read related songs and related playlists**
----

* **URL** /songs/:songId/related

* **Method:** `GET`
  
*  **URL Params**

   **Required:** `songId=[integer]`

* **Data Params** NA

* **Success Response:**
 
  * **Code:** 200 OK <br />
    **content:** `Successfully fetched!` and JSON Object of related songs and related playlists 
  
      **Related songs and related playlists**
      {
        {
      _id: Number,
      song_name: String,
      artist_name: String,
      artist_location: String,
      artist_followers: Number,
      song_likes: Number,
      song_reposts: Number,
      song_plays: Number,
      song_comments: Number,
      artist_image_url: String,
      song_image_url: String
    },
      {
        _id: Number,
        playlist_name: String,
        playlist_likes: Number,
        playlist_reposts: Number,
        user_name: String,
        user_location: String,
        user_followers: Number,
        playlist_image_url: String,
        user_image_url: String
      }
    }

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Response:** `Related songs and related playlists doesnt exit`

**Update - Update a related song**
----

* **URL** /songs/:songId/related/

* **Method:** `PUT`
  
*  **URL Params**

   **Required:** `songId=[integer]`

* **Data Params** JSON Object `{
  song_name: String,
  artist_name: String,
  artist_location: String,
  artist_followers: Number,
  song_likes: Number,
  song_reposts: Number,
  song_plays: Number,
  song_comments: Number,
  artist_image_url: String,
  song_image_url: String
}`

* **Success Response:**
 
  * **Code:** 201 Created <br />
    **Response:** `Successfully updated!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Response:** `Unathrorized user, unable to update`

**Delete - Delete a related song**
----

* **URL** /songs/:songId/related/:relatedSongId

* **Method:** `DELETE`
  
*  **URL Params**

   **Required:** `songId=[integer]` && `relatedSongID=[integer]`

* **Data Params** NA

* **Success Response:**
 
  * **Code:** 200 OK <br />
    **Response Content:** `Successfully updated!`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Response Content:** `Related song does not exist, cant be deleted`

    or

  * **Code:** 401 UNAUTHORIZED <br />
    **Response Content:** `You are unauthorized to delete this song`
