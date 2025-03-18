module.exports = {
    customId: "dynamic_select=",
    async execute(client, interaction, id) {
        const selectedValue = interaction.values[0];

        await interaction.reply({ 
            content: `🔄 Kamu memilih **${selectedValue}** dari Select Menu Dinamis dengan ID: ${id}.`, 
            ephemeral: true 
        });
    }
};
