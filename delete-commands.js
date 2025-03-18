require('dotenv').config();
const { REST, Routes } = require('discord.js');

const token = process.env.token;
const clientId = process.env.clientId;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🗑️ Menghapus semua global commands...');

        await rest.put(Routes.applicationCommands(clientId), { body: [] });

        console.log('✅ Semua global commands berhasil dihapus!');
    } catch (error) {
        console.error('❌ Gagal menghapus commands:', error);
    }
})();
