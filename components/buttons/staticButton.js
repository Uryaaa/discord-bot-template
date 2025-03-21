module.exports = {
    customId: "static_button",
    handler: async (client, interaction) => {
        await interaction.reply({ content: "🔘 You pressed **Static Button**!", ephemeral: true });
    }
};
