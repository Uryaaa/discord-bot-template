const { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "menu",
    aliases: [],
    category: "utility",
    description: "Menampilkan menu dengan button dan select menu statis serta dinamis.",
    async execute (message) {
        const embed = new EmbedBuilder()
            .setTitle("📋 Pilih Opsi")
            .setDescription("Gunakan tombol atau select menu di bawah ini untuk berinteraksi.")
            .setColor("#00AEEF");

        // 🔹 Button Statis
        const staticButton = new ButtonBuilder()
            .setCustomId("static_button")
            .setLabel("🔘 Static Button")
            .setStyle(ButtonStyle.Primary);

        // 🔹 Button Dinamis (Menggunakan ID tambahan)
        const dynamicButton = new ButtonBuilder()
            .setCustomId("dynamic_button=123")
            .setLabel("🌀 Dynamic Button (ID 123)")
            .setStyle(ButtonStyle.Success);

        // 🔹 Select Menu Statis
        const staticSelectMenu = new StringSelectMenuBuilder()
            .setCustomId("static_select")
            .setPlaceholder("📌 Pilih opsi statis...")
            .addOptions([
                { label: "Opsi 1", value: "option1" },
                { label: "Opsi 2", value: "option2" },
                { label: "Opsi 3", value: "option3" }
            ]);

        // 🔹 Select Menu Dinamis (Menggunakan ID tambahan)
        const dynamicSelectMenu = new StringSelectMenuBuilder()
            .setCustomId("dynamic_select=456")
            .setPlaceholder("🔄 Pilih opsi dinamis...")
            .addOptions([
                { label: "Kategori A", value: "category_a" },
                { label: "Kategori B", value: "category_b" },
                { label: "Kategori C", value: "category_c" }
            ]);

        // Baris 1: Button Statis & Dinamis
        const buttonRow = new ActionRowBuilder().addComponents(staticButton, dynamicButton);

        // Baris 2: Select Menu Statis (HARUS DIPISAH)
        const staticSelectRow = new ActionRowBuilder().addComponents(staticSelectMenu);

        // Baris 3: Select Menu Dinamis (HARUS DIPISAH)
        const dynamicSelectRow = new ActionRowBuilder().addComponents(dynamicSelectMenu);

        await message.reply({ 
            embeds: [embed], 
            components: [buttonRow, staticSelectRow, dynamicSelectRow] 
        });
    }
};
