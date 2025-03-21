const { EmbedBuilder } = require('discord.js');

module.exports = (player, queue) => {
    try {
        if (!queue.metadata || !queue.metadata.send) return;

        const embed = new EmbedBuilder()
            .setTitle("🚪 Disconnected")
            .setDescription("The bot has left the voice channel.")
            .setColor("#FF0000") // Red
            .setTimestamp();

        queue.metadata.send({ embeds: [embed] }).catch(console.error);
    } catch (error) {
        console.error("Error sending disconnect embed:", error);
    }
};
