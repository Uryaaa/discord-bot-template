const { MessageFlags } = require("discord.js");

module.exports = {
    customId: "dynamic_button=",
    async execute(client, interaction, id) {
        await interaction.reply({ 
            content: `🌀 You pressed **Dynamic Button** with ID: ${id}!`, 
            flags: MessageFlags.Ephemeral
        });
    }
};
