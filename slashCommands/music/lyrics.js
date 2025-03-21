const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Get lyrics for the currently playing song"),

    async execute(interaction) {
        await interaction.deferReply();

        const queue = useQueue(interaction.guild.id);
        const player = useMainPlayer();

        if (!queue || !queue.currentTrack) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("❌ There is nothing currently playing.")
                        .setColor("#FF0000")
                ]
            });
        }

        try {
            const results = await player.lyrics.search({ q: queue.currentTrack.title });
            if (!results || results.length === 0) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`❌ Couldn't find lyrics for **${queue.currentTrack.title}**.`)
                            .setColor("#FF0000")
                    ]
                });
            }

            const lyrics = results[0];
            const plainLyrics = lyrics?.plainLyrics;
            if (!plainLyrics) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`❌ Couldn't find lyrics for **${queue.currentTrack.title}**.`)
                            .setColor("#FF0000")
                    ]
                });
            }

            const trimmedLyrics = plainLyrics.substring(0, 1997);

            const embed = new EmbedBuilder()
                .setTitle(lyrics.name)
                .setAuthor({ name: lyrics.artistName })
                .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
                .setColor("#00FF00");

            return interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("❌ Failed to fetch lyrics.")
                        .setColor("#FF0000")
                ]
            });
        }
    }
};
