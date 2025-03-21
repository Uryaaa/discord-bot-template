const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('Seek to a specific time in the current song')
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Time to seek to in seconds')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ There is no song currently playing!')
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        const trackDuration = queue.currentTrack.durationMS / 1000;

        if (seconds < 0 || seconds > trackDuration) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ Invalid time! Please provide a value between 0 and ${Math.floor(trackDuration)} seconds.`)
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        await queue.node.seek(seconds * 1000); // Seek to the specified time in milliseconds

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`⏩ Seeked to ${seconds} seconds into the current song.`)
                    .setColor('#00FF00') // Green color
            ]
        });
    }
};
