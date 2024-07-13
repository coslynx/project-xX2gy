const { VoiceConnection, createAudioResource, StreamType, createAudioPlayer, joinVoiceChannel } = require('@discordjs/voice');
const { getSongInfo } = require('../api/youtubeAPI');

const queue = require('../utils/queue');
const volume = require('../utils/volume');
const search = require('../utils/search');
const loop = require('../utils/loop');
const shuffle = require('../utils/shuffle');

module.exports = {
  name: 'play',
  description: 'Play a song in the voice channel',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('You need to be in a voice channel to play music!');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.reply('I need the permissions to join and speak in your voice channel!');
    }

    const query = args.join(' ');
    const songInfo = await getSongInfo(query);

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();
    connection.subscribe(player);

    const resource = createAudioResource(songInfo.url, {
      inputType: StreamType.Arbitrary,
    });

    player.play(resource);
    queue.addToQueue(songInfo);
    volume.setVolume(50); // Default volume
    loop.setLoop(false); // Default loop setting
    shuffle.setShuffle(false); // Default shuffle setting

    player.on('stateChange', (oldState, newState) => {
      if (newState.status === 'idle') {
        if (queue.getQueue().length > 0) {
          const nextSong = queue.getQueue()[0];
          const nextResource = createAudioResource(nextSong.url, {
            inputType: StreamType.Arbitrary,
          });
          player.play(nextResource);
          queue.removeFromQueue();
        } else {
          connection.destroy();
        }
      }
    });

    message.channel.send(`Now playing: ${songInfo.title}`);
  },
};