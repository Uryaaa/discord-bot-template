const { EmbedBuilder } = require('discord.js');

module.exports = (player, queue, error) => {
    console.error('Player error:', error);

    const errorEmbed = new EmbedBuilder()
        .setColor('#FF0000') 
        .setTitle('❌ Playback Error')
        .setDescription(`An error occurred while playing music.\n\`\`\`${error.message}\`\`\``)
        .setTimestamp();

    queue.metadata?.send({ embeds: [errorEmbed] });
};
