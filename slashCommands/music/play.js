const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song in your voice channel')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Song name or URL')
                .setRequired(true)
                .setAutocomplete(true) // Enable autocomplete
        ),

    async autocompleteRun(interaction) {
        const player = useMainPlayer();
        const query = interaction.options.getString('song', true);

        if (!query) return interaction.respond([]);

        const results = await player.search(query);

        if (!results.tracks.length) return interaction.respond([]);

        return interaction.respond(
            results.tracks.slice(0, 10).map(track => ({
                name: track.title,
                value: track.url
            }))
        );
    },

    async execute(interaction) {
        const player = useMainPlayer();
        await interaction.deferReply();

        // Check if user is in a voice channel
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ **You need to be in a voice channel!**')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        // Check bot permissions
        const botPermissions = voiceChannel.permissionsFor(interaction.guild.members.me);
        if (!botPermissions.has(PermissionsBitField.Flags.Connect)) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ **I need `CONNECT` permissions to join the channel!**')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }
        if (!botPermissions.has(PermissionsBitField.Flags.Speak)) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ **I need `SPEAK` permissions to play music!**')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        // Search for the song
        const query = interaction.options.getString('song');
        const searchResult = await player.search(query, {
            requestedBy: interaction.user
        });

        if (!searchResult.hasTracks()) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ **No results found for \`${query}\`!**`)
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }

        try {
            // Play the first search result
            const { track } = await player.play(voiceChannel, searchResult.tracks[0].url, {
                nodeOptions: {
                    metadata: interaction.channel,
                    volume: 50,
                    leaveOnEnd: false
                }
            });

            // Create an embed with song details
            const embed = new EmbedBuilder()
                .setTitle('🎵 Now Playing')
                .setDescription(`**[${track.title}](${track.url})**`)
                .addFields(
                    { name: '⏳ Duration', value: track.duration, inline: true },
                    { name: '🎤 Artist', value: track.author || 'Unknown', inline: true },
                    { name: '👤 Requested By', value: `<@${interaction.user.id}>`, inline: true }
                )
                .setThumbnail(track.thumbnail)
                .setColor('#00FF00')
                .setFooter({ text: `Source: ${track.source}` });

            return interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ **Failed to play the song.**')
                        .setColor('#FF0000')
                ],
                flags:MessageFlags.Ephemeral
            });
        }
    }
};
