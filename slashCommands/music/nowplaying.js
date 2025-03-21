const { SlashCommandBuilder, EmbedBuilder, MessageFlags} = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Shows the currently playing song'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({ 
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ There is no song playing!')
                        .setColor('#FF0000') // Red color in HEX
                ],
                MessageFlags: MessageFlags.Ephemeral
            });
        }

        const track = queue.currentTrack;
        const requestedBy = track.requestedBy ? track.requestedBy.username : 'Unknown'; // Handle null/undefined case

        const embed = new EmbedBuilder()
            .setTitle('🎶 Now Playing')
            .setDescription(`**[${track.title}](${track.url})**`)
            .setThumbnail(track.thumbnail)
            .addFields(
                { name: 'Requested by', value: requestedBy, inline: true },
                { name: 'Duration', value: track.duration, inline: true }
            )
            .setColor('#00FF00'); // Green color in HEX

        return interaction.reply({ embeds: [embed] });
    }
};
