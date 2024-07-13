const { MessageEmbed } = require('discord.js');
const { queue } = require('../utils/queue');

module.exports = {
    name: 'stop',
    description: 'Stop the music and clear the queue',
    execute(message) {
        const serverQueue = queue.get(message.guild.id);

        if (!message.member.voice.channel) {
            return message.channel.send('You need to be in a voice channel to stop the music!');
        }

        if (!serverQueue) {
            return message.channel.send('There is no music playing that I could stop!');
        }

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        message.channel.send('Music has been stopped and the queue has been cleared!');
    }
};