const spotifyAPI = require('spotify-web-api-node');
const nodeFetch = require('node-fetch');

const spotify = new spotifyAPI({
  clientId: 'YOUR_SPOTIFY_CLIENT_ID',
  clientSecret: 'YOUR_SPOTIFY_CLIENT_SECRET',
});

spotify.clientCredentialsGrant()
  .then(data => {
    spotify.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Error authorizing Spotify API: ', error);
  });

const searchSong = async (query) => {
  try {
    const response = await nodeFetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${spotify.getAccessToken()}`,
      },
    });
    const data = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.log('Error searching for song on Spotify: ', error);
    return [];
  }
};

const getSongDetails = async (songId) => {
  try {
    const response = await nodeFetch(`https://api.spotify.com/v1/tracks/${songId}`, {
      headers: {
        Authorization: `Bearer ${spotify.getAccessToken()}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error getting song details from Spotify: ', error);
    return null;
  }
};

module.exports = {
  searchSong,
  getSongDetails,
};