module.exports = {
    customId: "static_select",
    handler: async (client, interaction) => {
        const selectedValue = interaction.values[0];
        await interaction.reply({ content: `📌 You selected **${selectedValue}** from the Static Select Menu.`, ephemeral: true });
    }
};
