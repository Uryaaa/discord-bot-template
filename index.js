const { Client, Collection, GatewayIntentBits, Partials} = require('discord.js');
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');
require('dotenv').config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences,
        
    ],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false
    },
    partials : [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
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
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
initialize();
