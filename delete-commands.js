require('dotenv').config();
const { REST, Routes } = require('discord.js');

const token = process.env.token;
const clientId = process.env.clientId;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🗑️ Menghapus semua guild commands...');

        // Fetch daftar semua guild tempat bot berada
        const guilds = await rest.get(Routes.userGuilds());

        for (const guild of guilds) {
            await rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: [] });
            console.log(`✅ Slash commands dihapus dari guild: ${guild.name} (${guild.id})`);
        }

        console.log('✅ Semua guild commands berhasil dihapus!');
    } catch (error) {
        console.error('❌ Gagal menghapus commands:', error);
    }
})();
