const fs = require('fs');
const path = require('path');

module.exports = (player) => {
    const playerEventsPath = path.join(__dirname, '../events/player');
    fs.readdirSync(playerEventsPath)
        .filter(file => file.endsWith('.js'))
        .forEach(file => {
            const eventName = file.replace('.js', '');
            const eventHandler = require(path.join(playerEventsPath, file));
            player.events.on(eventName, (...args) => eventHandler(player, ...args));
        });

    console.log('✅ Player events loaded!');
};
