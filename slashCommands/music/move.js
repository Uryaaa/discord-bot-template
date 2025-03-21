const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Move a song to a different position in the queue')
        .addIntegerOption(option =>
            option.setName('from')
                .setDescription('The current position of the song in the queue')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('to')
                .setDescription('The new position for the song in the queue')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const from = interaction.options.getInteger('from');
        const to = interaction.options.getInteger('to');
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

        if (from < 1 || from > queue.tracks.length || to < 1 || to > queue.tracks.length) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ Invalid positions! Please provide numbers between 1 and the length of the queue.')
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        const track = queue.node.remove(from - 1); // Positions are 0-based internally
        queue.node.insert(track, to - 1);

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`🔀 Moved **${track.title}** from position ${from} to ${to}.`)
                    .setColor('#00FF00') // Green color
            ]
        });
    }
};
