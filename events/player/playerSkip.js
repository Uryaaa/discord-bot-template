const { EmbedBuilder } = require('discord.js');

module.exports = (player, queue, track) => {
    try {
        if (!queue.metadata || !queue.metadata.send) return;

        const embed = new EmbedBuilder()
            .setTitle("⏭️ Track Skipped")
            .setDescription(`Skipped **[${track.title || "Unknown"}](${track.url || "#"})**`)
            .setThumbnail(track.thumbnail || "https://i.imgur.com/2n1cGDb.png")
            .setColor("#FFA500") // Orange color
            .setTimestamp();

        queue.metadata.send({ embeds: [embed] }).catch(console.error);
    } catch (error) {
        console.error("Error sending skip embed:", error);
    }
};
