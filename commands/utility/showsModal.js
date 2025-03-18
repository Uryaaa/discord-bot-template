const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

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

        // Buat modal
        const modal = new ModalBuilder()
            .setCustomId("feedback_form")
            .setTitle("Feedback Form");

        // Input feedback
        const feedbackInput = new TextInputBuilder()
            .setCustomId("feedback_input")
            .setLabel("Masukkan feedback kamu")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        // Tambahkan ke modal
        const actionRow = new ActionRowBuilder().addComponents(feedbackInput);
        modal.addComponents(actionRow);

        try {
            await message.reply("📝 Klik tombol di bawah untuk memberikan feedback!", { ephemeral: true });

            // Tampilkan modal
            await message.author.send({ content: "🔹 Klik tombol di bawah untuk memberikan feedback!", components: [modal] });
        } catch (error) {
            console.error(error);
            await message.reply("❌ Gagal membuka modal. Pastikan bot memiliki izin untuk mengirim pesan di DM.");
        }
    }
};
