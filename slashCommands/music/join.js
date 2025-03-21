const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { useQueue, useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Bot joins your current voice channel'),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ You need to be in a voice channel for me to join!')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        // Check if the bot is already in a voice channel
        if (interaction.guild.members.me.voice.channel) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`✅ Already connected to **${interaction.guild.members.me.voice.channel.name}**!`)
                        .setColor('#00FF00')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        try {
            const player = useMainPlayer();
            let queue = useQueue(interaction.guild.id);

            if (!queue) {
                queue = await player.nodes.create(interaction.guild, {
                    metadata: interaction.channel,
                    volume: 50,
                    leaveOnEnd: false,
                });
            }

            // Now actually make the bot join the channel
            await queue.connect(voiceChannel);

            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`✅ Joined **${voiceChannel.name}**!`)
                        .setColor('#00FF00')
                ]
            });

        } catch (error) {
            console.error(error);
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ Failed to join the voice channel.')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }
    },
};
