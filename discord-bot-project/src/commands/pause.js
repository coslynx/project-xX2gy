const { CommandInteraction } = require('discord.js');

module.exports = {
    data: {
        name: 'pause',
        description: 'Pause the currently playing music',
    },

    async execute(interaction = new CommandInteraction()) {
        const queue = interaction.client.queue.get(interaction.guildId);
        if (!queue) return interaction.reply('There is no music playing currently.');

        if (queue.player && queue.player.playing) {
            queue.player.pause();
            interaction.reply('Music playback paused.');
        } else {
            interaction.reply('There is no music playing currently.');
        }
    },
};