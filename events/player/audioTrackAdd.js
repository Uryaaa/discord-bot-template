const { EmbedBuilder } = require('discord.js');

module.exports = (player, queue, track) => {
    try {
        if (!queue.metadata || !queue.metadata.send) return;

        const embed = new EmbedBuilder()
            .setTitle("🎵 Track Added to Queue")
            .setDescription(`**[${track.title}](${track.url})** has been added to the queue.`)
            .setThumbnail(track.thumbnail || "https://i.imgur.com/2n1cGDb.png")
            .setColor("#00FF00") // Green
            .setTimestamp();

        queue.metadata.send({ embeds: [embed] }).catch(console.error);
    } catch (error) {
        console.error("Error sending track add embed:", error);
    }
};
