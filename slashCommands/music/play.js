const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song in your voice channel')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Song name or URL')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const player = useMainPlayer();
        await interaction.deferReply();

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.editReply('❌ You need to be in a voice channel!');
        }

        const botPermissions = voiceChannel.permissionsFor(interaction.guild.members.me);
        if (!botPermissions.has(PermissionsBitField.Flags.Connect)) {
            return interaction.editReply('❌ I need **CONNECT** permissions!');
        }
        if (!botPermissions.has(PermissionsBitField.Flags.Speak)) {
            return interaction.editReply('❌ I need **SPEAK** permissions!');
        }

        try {
            const { track } = await player.play(voiceChannel, interaction.options.getString('song'), {
                nodeOptions: {
                    metadata: interaction.channel, // Direct channel reference
                    volume: 50,
                    leaveOnEnd: false
                }
            });

            return interaction.editReply(`✅ Added **${track.title}** to the queue!`);
        } catch (error) {
            console.error(error);
            return interaction.editReply('❌ Failed to play: ' + error.message);
        }
    }
};
