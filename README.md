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

* **URL** /songs/:songId/related/songs

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
    **Response:** `Successfully posted!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Response:** `Unathrorized user, unable to post`

**READ - Read related songs and related playlists**
----

* **URL** /songs/:songId/related

* **Method:** `GET`
  
*  **URL Params**

   **Required:** `songId=[integer]`

* **Data Params** NA

* **Success Response:**
 
  * **Code:** 200 OK <br />
    **Response:** `Successfully fetched!`
    **Content response** JSON Object of related songs and related playlists 
  
      **Related songs**
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
    }

      **Related playlists**
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

 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Response:** `Related songs and related playlists doesnt exit`

**Update - Update a related song**
----

* **URL** /songs/:songId/related/songs

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