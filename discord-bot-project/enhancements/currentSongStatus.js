const Discord = require('discord.js');

module.exports = {
  name: 'currentSongStatus',
  description: 'Display the currently playing song in Discord status',

  execute(client, message) {
    const queue = client.queue.get(message.guild.id);

    if (!queue || !queue.songs[0]) {
      return message.channel.send('There is no song currently playing.');
    }

    const currentSong = queue.songs[0];

    client.user.setActivity(`${currentSong.title} | ${currentSong.artist}`, { type: 'LISTENING' });
  },
};