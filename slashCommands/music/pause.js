const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song'),
    
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

        queue.node.setPaused(true);
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('⏸️ Paused the current song.')
                    .setColor('#FFFF00')
            ]
        });
    }
};
