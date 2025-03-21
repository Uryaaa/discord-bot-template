const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the current queue'),
    
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || queue.size === 0) { 
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ The queue is empty!')
                        .setColor('#FF0000')
                ],
                flags: MessageFlags.Ephemeral
            });
        }

        queue.tracks.shuffle();

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('🔀 Shuffled the queue.')
                    .setColor('#00FF00')
            ]
        });
    }
};
