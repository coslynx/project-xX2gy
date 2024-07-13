const customPlaylists = {
  playlists: {},

  createPlaylist: function (userId, playlistName) {
    if (!this.playlists[userId]) {
      this.playlists[userId] = {};
    }
    this.playlists[userId][playlistName] = [];
  },

  addToPlaylist: function (userId, playlistName, song) {
    if (!this.playlists[userId] || !this.playlists[userId][playlistName]) {
      return "Playlist not found.";
    }
    this.playlists[userId][playlistName].push(song);
    return "Song added to the playlist.";
  },

  removeFromPlaylist: function (userId, playlistName, index) {
    if (!this.playlists[userId] || !this.playlists[userId][playlistName]) {
      return "Playlist not found.";
    }
    if (index < 0 || index >= this.playlists[userId][playlistName].length) {
      return "Invalid index.";
    }
    this.playlists[userId][playlistName].splice(index, 1);
    return "Song removed from the playlist.";
  },

  getPlaylist: function (userId, playlistName) {
    if (!this.playlists[userId] || !this.playlists[userId][playlistName]) {
      return "Playlist not found.";
    }
    return this.playlists[userId][playlistName];
  },

  getAllPlaylists: function (userId) {
    if (!this.playlists[userId]) {
      return "No playlists found.";
    }
    return this.playlists[userId];
  },

  deletePlaylist: function (userId, playlistName) {
    if (!this.playlists[userId] || !this.playlists[userId][playlistName]) {
      return "Playlist not found.";
    }
    delete this.playlists[userId][playlistName];
    return "Playlist deleted successfully.";
  },
};

module.exports = customPlaylists;