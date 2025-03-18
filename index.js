const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');
const {YoutubeiExtractor} = require('discord-player-youtubei');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Initialize collections
client.slashCommands = new Collection();
client.textCommands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.contextMenus = new Collection();
client.modals = new Collection();

async function initialize() {
    try {
        // Initialize player
        const player = new Player(client);
        await player.extractors.loadMulti(DefaultExtractors);
        await player.extractors.register(YoutubeiExtractor, {
          /** extractor options goes here */  
        })

        // Load all handlers
        require('./loaders/discordEvents')(client);
        require('./loaders/playerEvents')(player);
        require('./loaders/slashCommands')(client);
        require('./loaders/textCommands')(client);
        require('./loaders/buttons')(client);
        require('./loaders/selectMenus')(client);
        require('./loaders/contextMenus')(client);
        require('./loaders/modals')(client);

        // Start bot
        await client.login(process.env.token);
        console.log(`✅ Logged in as ${client.user.tag}!`);
    } catch (error) {
        console.error('❌ Initialization failed:', error);
        process.exit(1);
    }
}

initialize();
