const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skipto')
        .setDescription('Skip to a specific song in the queue')
        .addIntegerOption(option =>
            option.setName('position')
                .setDescription('The position of the song in the queue to skip to')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const position = interaction.options.getInteger('position');
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.tracks.length) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ The queue is empty!')
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        if (position < 1 || position > queue.tracks.length) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ Invalid position! Please provide a number between 1 and the length of the queue.')
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        queue.node.skipTo(position - 1); // Positions are 0-based internally

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`⏭️ Skipped to track number ${position} in the queue.`)
                    .setColor('#00FF00') // Green color
            ]
        });
    }
};
