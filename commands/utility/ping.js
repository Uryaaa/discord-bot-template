module.exports = {
    name: 'ping',
    aliases: ['pong'],
    category: 'utility',
    description: 'Replies with Pong! and shows the bot latency.',
    async execute(message) {
        
        const sentMessage = await message.channel.send('🏓 Pong!');
        const apiLatency = sentMessage.createdTimestamp - message.createdTimestamp;
        const wsPing = message.client.ws.ping;

        await sentMessage.edit(`🏓 Pong!\nAPI Latency: ${apiLatency}ms\nWebSocket Ping: ${wsPing}ms`);
    }
};
