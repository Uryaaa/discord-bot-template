module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;

        const mainPlayer = require('discord-player').useMainPlayer();

        await mainPlayer.context.provide(
            { guild: interaction.guild },
            async () => {
                try {
                    await command.execute(interaction);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({
                        content: '❌ Command failed: ' + error.message,
                        ephemeral: true // why this is deprecated
                    });
                }
            }
        );
    }

    if (interaction.isButton()) {
        let customId = interaction.customId;
        let id = null;
    
        if (customId.includes('=')) {
            const parts = customId.split('=');
            customId = parts[0] + '='; 
            id = parts[1];
        }
    
        const button = client.buttons.get(customId);
        if (button) {
            try {
                await button.execute(client, interaction, id);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: '❌ Button error: ' + error.message, ephemeral: true });
            }
        }
    }
    
    if (interaction.isStringSelectMenu()) {
        let customId = interaction.customId;
        let id = null;
    
        if (customId.includes('=')) {
            const parts = customId.split('=');
            customId = parts[0] + '='; 
            id = parts[1];
        }
    
        const selectMenu = client.selectMenus.get(customId);
        if (selectMenu) {
            try {
                await selectMenu.execute(client, interaction, id);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: '❌ Select menu error: ' + error.message, ephemeral: true });
            }
        }
    }

    if (interaction.isContextMenuCommand()) {
        const contextCommand = client.contextMenus.get(interaction.commandName);
        if (!contextCommand) return;

        try {
            await contextCommand.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ Context menu failed: ' + error.message,
                ephemeral: true
            });
        }
    }

    
};
