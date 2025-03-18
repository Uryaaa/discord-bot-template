module.exports = {
    customId: "feedback_form",
    async execute(client, interaction) {
        const feedback = interaction.fields.getTextInputValue("feedback_input");

        await interaction.reply({
            content: `📩 Terima kasih atas feedback kamu: **"${feedback}"**`,
            ephemeral: true
        });
    }
};
