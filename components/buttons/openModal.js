const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    customId: "open_feedback",
    async execute(client, interaction) {
        const modal = new ModalBuilder()
            .setCustomId("feedback_form")
            .setTitle("Feedback Form");

        const feedbackInput = new TextInputBuilder()
            .setCustomId("feedback_input")
            .setLabel("Enter your feedback")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const actionRow = new ActionRowBuilder().addComponents(feedbackInput);
        modal.addComponents(actionRow);

        await interaction.showModal(modal);
    }
};
