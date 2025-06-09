const { ActivityType } = require('discord.js');
const config = require('../../config');

module.exports = (client) => {
    console.log(`✅ Bot is online as ${client.user.tag} (ID: ${client.user.id})`);
    console.log(`📊 Serving ${client.guilds.cache.size} servers with ${client.users.cache.size} users`);

    // Function to update bot presence dynamically
    const updatePresence = () => {
        // Build statuses from config with dynamic values
        const statuses = config.statuses.map(status => {
            let name = status.name;

            // Handle dynamic status values
            if (status.dynamic === 'guilds') {
                name = `${client.guilds.cache.size} ${status.name}`;
            }

            return {
                name,
                type: ActivityType[status.type] || ActivityType.Playing
            };
        });

        let i = 0;
        const interval = setInterval(() => {
            try {
                if (!client.isReady()) {
                    clearInterval(interval);
                    return;
                }

                client.user.setPresence({
                    activities: [statuses[i]],
                    status: 'online'
                });
                i = (i + 1) % statuses.length;
            } catch (error) {
                console.error('❌ Error updating presence:', error.message);
                clearInterval(interval);
            }
        }, config.bot.statusRotationInterval);

        // Store interval for cleanup
        client.intervals.add(interval);

        return interval;
    };

    // Initialize presence rotation
    updatePresence();
    console.log('✅ Status rotation initialized');
};
