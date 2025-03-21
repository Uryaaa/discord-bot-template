module.exports = {
    customId: "dynamic_select=",
    async execute(client, interaction, id) {
        const selectedValue = interaction.values[0];

        await interaction.reply({ 
            content: `🔄 You selected **${selectedValue}** from the Dynamic Select Menu with ID: ${id}.`, 
            
        });
    }
};
