const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('User Info')
        .setType(ApplicationCommandType.User),
    
    async execute(client, interaction) {
        const user = interaction.targetUser;

        await interaction.reply({
            content: `👤 **User Info**\n- **Username:** ${user.username}\n- **ID:** ${user.id}`,
            flags:MessageFlags.Ephemeral
        });
    }
};
