const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filter')
        .setDescription('Apply or remove audio filters')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('The type of filter to apply')
                .setRequired(true)
                .addChoices(
                    { name: 'Bass Boost', value: 'bassboost' },
                    { name: 'Nightcore', value: 'nightcore' },
                    { name: 'Vaporwave', value: 'vaporwave' },
                    { name: 'Remove Filters', value: 'off' }
                )
        ),

    async execute(interaction) {
        const filterType = interaction.options.getString('type');
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ There is no song currently playing!')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        try {
            if (filterType === 'off') {
                await queue.filters.ffmpeg.setFilters(false); // Turn off all filters
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('🚫 Removed all filters.')
                            .setColor('#00FF00')
                    ]
                });
            }

            await queue.filters.ffmpeg.toggle(filterType); // Apply selected filter

            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`🎛️ Applied **${filterType}** filter.`)
                        .setColor('#00FF00')
                ]
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ Failed to apply the filter.')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }
    }
};
