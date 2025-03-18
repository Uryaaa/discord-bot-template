const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const discordEventFiles = fs.readdirSync('./events/discord').filter(file => file.endsWith('.js'));

    for (const file of discordEventFiles) {
        const eventName = path.parse(file).name;
        const event = require(`../events/discord/${file}`);
        client.on(eventName, event.bind(null, client));
    }

    console.log('✅ Discord events loaded!');
};
