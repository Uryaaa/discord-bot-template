const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and clear the queue'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ There is no song playing!')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        queue.delete();
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('🛑 Stopped the music and cleared the queue.')
                    .setColor('#FF0000')
            ]
        });
    }
};
