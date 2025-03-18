require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const token = process.env.token;
const clientId = process.env.clientId;

const commands = [];

// Load Slash Commands
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCategories = fs.readdirSync(slashCommandsPath);

for (const category of slashCategories) {
    const commandFiles = fs.readdirSync(path.join(slashCommandsPath, category))
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(slashCommandsPath, category, file));
        if (command.data) {
            commands.push(command.data.toJSON());
        }
    }
}

// Load Context Menus
const contextMenusPath = path.join(__dirname, 'components/contextMenus');
if (fs.existsSync(contextMenusPath)) {
    const contextMenuFiles = fs.readdirSync(contextMenusPath).filter(file => file.endsWith('.js'));

    for (const file of contextMenuFiles) {
        const contextMenu = require(path.join(contextMenusPath, file));
        if (contextMenu.data) {
            commands.push(contextMenu.data.toJSON());
        }
    }
}

// Register Commands
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`🚀 Deploying ${commands.length} global commands...`);
        
        await rest.put(Routes.applicationCommands(clientId), { body: commands });

        console.log('✅ Successfully deployed global commands!');
    } catch (error) {
        console.error('❌ Failed to deploy commands:', error);
    }
})();
