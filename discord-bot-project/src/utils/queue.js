const { createAudioPlayer, createAudioResource, joinVoiceChannel, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');
const { Client } = require('discord.js');
const { ytdl } = require('ytdl-core');

const queue = new Map();

const playQueue = async (message, queue) => {
  const serverQueue = queue.get(message.guild.id);
  if (!serverQueue) {
    queue.delete(message.guild.id);
    return;
  }

  const connection = getVoiceConnection(message.guild.id);

  if (!serverQueue.songs.length) {
    connection.destroy();
    queue.delete(message.guild.id);
    return;
  }

  const resource = createAudioResource(ytdl(serverQueue.songs[0].url), { inlineVolume: true });
  serverQueue.connection.subscribe(resource);
  serverQueue.songs.shift();

  resource.player.on('stateChange', (oldState, newState) => {
    if (newState.status === VoiceConnectionStatus.Destroyed) {
      queue.delete(message.guild.id);
    }
  });
};

module.exports = {
  execute(message, queue) {
    const serverQueue = queue.get(message.guild.id);
    playQueue(message, queue);
  }
};