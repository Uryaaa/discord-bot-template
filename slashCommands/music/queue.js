const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the current song queue'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || queue.size === 0) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ The queue is empty!')
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        const trackList = queue.tracks.map((track, index) => `${index + 1}. ${track.title}`).join('\n');

        const embed = new EmbedBuilder()
            .setTitle('🎶 Current Queue')
            .setDescription(trackList)
            .setColor('#00FF00'); // Green color

        return interaction.reply({ embeds: [embed] });
    }
};
