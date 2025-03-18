const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const textCommandsPath = path.join(__dirname, '../commands');
    const textCategories = fs.readdirSync(textCommandsPath);

    for (const category of textCategories) {
        const commandFiles = fs.readdirSync(path.join(textCommandsPath, category))
            .filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(textCommandsPath, category, file));
            client.textCommands.set(command.name, command);
        }
    }

    console.log('✅ Text commands loaded!');
};
