module.exports = {
    customId: "static_button",
    handler: async (client, interaction) => {
        await interaction.reply({ content: "🔘 Kamu menekan **Static Button**!", ephemeral: true });
    }
};
