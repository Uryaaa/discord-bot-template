const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ There is no song playing!')
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        const currentTrack = queue.currentTrack;
        const success = queue.node.skip();

        if (success) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`⏭️ Skipped **${currentTrack.title}**`)
                        .setColor('#00FF00') // Green color
                ]
            });
        } else {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ Failed to skip the current song!')
                        .setColor('#FF0000') // Red color
                ],
                flags:MessageFlags.Ephemeral
            });
        }
    }
};
