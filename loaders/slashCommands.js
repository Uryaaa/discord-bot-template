const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const slashCommandsPath = path.join(__dirname, '../slashCommands');
    const slashCategories = fs.readdirSync(slashCommandsPath);

    for (const category of slashCategories) {
        const commandFiles = fs.readdirSync(path.join(slashCommandsPath, category))
            .filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(slashCommandsPath, category, file));
            client.slashCommands.set(command.data.name, command);
        }
    }

    console.log('✅ Slash commands loaded!');
};
