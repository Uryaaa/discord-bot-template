const {ActivityType} = require('discord.js');

module.exports = (client) => {
    console.log(`✅ Bot is online as ${client.user.tag} (ID: ${client.user.id})`);

    // Function to update bot presence dynamically
    const statuses = [
        { name: 'Type /play', type: ActivityType.Listening },
        { name: `${client.guilds.cache.size} servers`, type: ActivityType.Watching },
        { name: 'with discord.js', type: ActivityType.Playing }
    ];

    let i = 0;
    setInterval(() => {
        client.user.setPresence({
            activities: [statuses[i]],
            status: 'online'
        });
        i = (i + 1) % statuses.length;
    }, 15000); // Change every 15 seconds

    console.log('✅ Status rotation initialized');
};
