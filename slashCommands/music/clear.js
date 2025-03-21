const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the current song queue'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.tracks.length) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ The queue is already empty!')
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        queue.node.clear();

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('🧹 Cleared the song queue.')
                    .setColor('#00FF00') // Green color
            ]
        });
    }
};
