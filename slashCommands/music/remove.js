const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a specific song from the queue')
        .addIntegerOption(option =>
            option.setName('position')
                .setDescription('The position of the song in the queue to remove')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const position = interaction.options.getInteger('position');
        const queue = useQueue(interaction.guild.id);

        if (!queue || queue.size === 0) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ The queue is empty!')
                        .setColor('#FF0000') // Red color
                ],
                flags: MessageFlags.Ephemeral
            });
        }

        if (position < 1 || position > queue.size) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ Invalid position! Please provide a number between 1 and the length of the queue.')
                        .setColor('#FF0000') // Red color
                ],
                flags: MessageFlags.Ephemeral
            });
        }

        const removedTrack = queue.removeTrack(position - 1); // Use correct removal method

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`🗑️ Removed **${removedTrack.title}** from the queue.`)
                    .setColor('#00FF00') // Green color
            ]
        });
    }
};
