const { EmbedBuilder } = require('discord.js');

module.exports = (player, queue) => {
    try {
        if (!queue.metadata || !queue.metadata.send) return;

        const embed = new EmbedBuilder()
            .setTitle("🏁 Queue Finished")
            .setDescription("All songs have been played! Add more songs to keep the music going. 🎵")
            .setColor("#FF0000") // Red color
            .setTimestamp();

        queue.metadata.send({ embeds: [embed] }).catch(console.error);
    } catch (error) {
        console.error("Error sending queue finished embed:", error);
    }
};
