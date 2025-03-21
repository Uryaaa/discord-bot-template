const { MessageFlags } = require('discord.js');

module.exports = {
    customId: "feedback_form",
    async execute(client, interaction) {
        const feedback = interaction.fields.getTextInputValue("feedback_input");

        await interaction.reply({
            content: `📩 Thank you for your feedback: **"${feedback}"**`,
            flags: MessageFlags.Ephemeral
        });
    }
};
