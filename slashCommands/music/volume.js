const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Adjusts the playback volume')
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Volume level (0-100)')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(100)
        ),

    async execute(interaction) {
        const volumeLevel = interaction.options.getInteger('level');
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ There is no song currently playing!')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        queue.node.setVolume(volumeLevel); // Set the volume

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`🔊 Volume has been set to **${volumeLevel}%**`)
                    .setColor('#00FF00')
            ]
        });
    }
};
