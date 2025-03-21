const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Set the loop mode')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Loop mode: off, track, or queue')
                .setRequired(true)
                .addChoices(
                    { name: 'Off', value: 'off' },
                    { name: 'Track', value: 'track' },
                    { name: 'Queue', value: 'queue' },
                    { name: 'Autoplay', value: 'autoplay' }
                )
        ),
    
    async execute(interaction) {
        const mode = interaction.options.getString('mode');
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

        let repeatMode;
        if (mode === 'off') repeatMode = QueueRepeatMode.OFF;
        else if (mode === 'track') repeatMode = QueueRepeatMode.TRACK;
        else if (mode === 'queue') repeatMode = QueueRepeatMode.QUEUE;
        else if (mode === 'autoplay') repeatMode = QueueRepeatMode.AUTOPLAY;

        queue.setRepeatMode(repeatMode);

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`🔁 Loop mode set to ${mode}`)
                    .setColor('#00FF00') 
            ]
        });
    }
};
