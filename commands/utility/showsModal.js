const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "feedback",
    aliases: [],
    category: "utility",
    description: "Buka modal untuk memberikan feedback",
    async execute(message) {
        if (!message.guild) return;

        // Cek apakah command dijalankan di DM
        if (message.channel.type === "DM") {
            return message.reply("❌ Command ini tidak bisa digunakan di DM.");
        }

        // Embed untuk feedback
        const embed = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("Feedback")
            .setDescription("📝 Klik tombol di bawah untuk memberikan feedback!");

        // Tombol untuk membuka modal
        const button = new ButtonBuilder()
            .setCustomId("open_feedback") // Sesuai dengan modalButton.js
            .setLabel("Buka Formulir")
            .setStyle(ButtonStyle.Primary);

        const actionRow = new ActionRowBuilder().addComponents(button);

        // Kirim embed dengan tombol
        try {
            await message.reply({ embeds: [embed], components: [actionRow] });
        } catch (error) {
            console.error(error);
            await message.reply("❌ Gagal mengirim pesan.");
        }
    }
};
