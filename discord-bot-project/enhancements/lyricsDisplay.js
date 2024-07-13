const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const lyricsFinder = require('lyrics-finder');

module.exports = {
  name: 'lyrics',
  description: 'Display lyrics of the currently playing song',
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send('There is no song playing right now.');

    let lyrics = null;
    try {
      lyrics = await lyricsFinder(queue.songs[0].title, '');
      if (!lyrics) lyrics = 'No lyrics found for this song.';
    } catch (error) {
      lyrics = 'Error finding lyrics for this song.';
    }

    const lyricsEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Lyrics')
      .setDescription(lyrics);

    message.channel.send({ embeds: [lyricsEmbed] });
  },
};