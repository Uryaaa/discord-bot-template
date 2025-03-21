module.exports = async (client, message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Cari command berdasarkan nama atau alias
    const command = client.textCommands.get(commandName) ||
                    client.textCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('❌ Error executing command: ' + error.message);
    }
};
