const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Bot leaves the current voice channel'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const voiceChannel = interaction.guild.members.me.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ I am not in a voice channel!')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        if (queue) {
            queue.delete();
        } else {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ I am not connected to a voice channel!')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`✅ Left **${voiceChannel.name}**!`)
                    .setColor('#00FF00')
            ]
        });
    },
};
