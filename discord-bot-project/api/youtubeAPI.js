const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js');

const play = async (message, song) => {
  const queue = message.client.queue.get(message.guild.id);

  if (!song) {
    queue.voiceChannel.leave();
    message.client.queue.delete(message.guild.id);
    return;
  }

  const dispatcher = queue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      queue.songs.shift();
      play(message, queue.songs[0]);
    })
    .on('error', error => console.error(error));
  
  dispatcher.setVolumeLogarithmic(queue.volume / 5);

  const songEmbed = new MessageEmbed()
    .setColor('#7289DA')
    .setTitle('Now Playing')
    .setDescription(`[${song.title}](${song.url})`)
    .setThumbnail(song.thumbnail);

  queue.textChannel.send({ embeds: [songEmbed] });
};

module.exports = {
  play,
};