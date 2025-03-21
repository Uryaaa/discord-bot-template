const { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'menu',
    aliases: [],
    category: 'utility',
    description: 'Displays a menu with static and dynamic buttons and select menus.',
    async execute(message) {
        const embed = new EmbedBuilder()
            .setTitle('📋 Choose an Option')
            .setDescription('Use the buttons or select menus below to interact.')
            .setColor('#00AEEF');

        // 🔹 Static Button
        const staticButton = new ButtonBuilder()
            .setCustomId('static_button')
            .setLabel('🔘 Static Button')
            .setStyle(ButtonStyle.Primary);

        // 🔹 Dynamic Button (Using additional ID)
        const dynamicButton = new ButtonBuilder()
            .setCustomId('dynamic_button=123')
            .setLabel('🌀 Dynamic Button (ID 123)')
            .setStyle(ButtonStyle.Success);

        // 🔹 Static Select Menu
        const staticSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('static_select')
            .setPlaceholder('📌 Choose a static option...')
            .addOptions([
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' }
            ]);

        // 🔹 Dynamic Select Menu (Using additional ID)
        const dynamicSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('dynamic_select=456')
            .setPlaceholder('🔄 Choose a dynamic option...')
            .addOptions([
                { label: 'Category A', value: 'category_a' },
                { label: 'Category B', value: 'category_b' },
                { label: 'Category C', value: 'category_c' }
            ]);

        // Row 1: Static & Dynamic Buttons
        const buttonRow = new ActionRowBuilder().addComponents(staticButton, dynamicButton);

        // Row 2: Static Select Menu (MUST BE SEPARATE)
        const staticSelectRow = new ActionRowBuilder().addComponents(staticSelectMenu);

        // Row 3: Dynamic Select Menu (MUST BE SEPARATE)
        const dynamicSelectRow = new ActionRowBuilder().addComponents(dynamicSelectMenu);

        await message.reply({
            embeds: [embed],
            components: [buttonRow, staticSelectRow, dynamicSelectRow]
        });
    }
};
