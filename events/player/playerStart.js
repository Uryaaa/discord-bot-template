const { EmbedBuilder } = require('discord.js');

module.exports = (player, queue, track) => {
    try {
        // Ensure metadata exists and is a valid text channel
        if (!queue.metadata || !queue.metadata.send) return;

        // Fallback values if some information is missing
        const title = track.title || "Unknown Title";
        const url = track.url || "N/A";
        const duration = track.duration || "Unknown Duration";
        const author = track.author || "Unknown Artist";
        const requestedBy = track.requestedBy ? `<@${track.requestedBy.id}>` : "Unknown User";
        const thumbnail = track.thumbnail || "https://i.imgur.com/2n1cGDb.png"; // Default image if missing

        // Create embed
        const embed = new EmbedBuilder()
            .setTitle("🎶 Now Playing")
            .setDescription(`**[${title}](${url})**`)
            .addFields(
                { name: "⏳ Duration", value: duration, inline: true },
                { name: "🎤 Artist", value: author, inline: true },
                { name: "🎧 Requested by", value: requestedBy, inline: true }
            )
            .setThumbnail(thumbnail)
            .setColor("#00FF00") // Green color
            .setTimestamp();

        // Send the embed
        queue.metadata.send({ embeds: [embed] }).catch(console.error);
    } catch (error) {
        console.error("Error sending now playing embed:", error);
    }
};
