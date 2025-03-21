const { EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = (player, queue, error) => {
    console.error(`❌ Player error: ${error.message}`);

    try {
        if (!queue.metadata || !queue.metadata.send) return;

        const embed = new EmbedBuilder()
            .setTitle("❌ Error")
            .setDescription(`An error occurred while playing music:\n\`\`\`${error.message}\`\`\``)
            .setColor("#FF0000") // Red color
            .setTimestamp();

        queue.metadata.send({ embeds: [embed], flags:MessageFlags.Ephemeral }).catch(console.error);
    } catch (err) {
        console.error("Error sending player error embed:", err);
    }
};
