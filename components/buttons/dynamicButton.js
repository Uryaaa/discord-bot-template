module.exports = {
    customId: "dynamic_button=",
    async execute(client, interaction, id) {
        await interaction.reply({ 
            content: `🌀 Kamu menekan **Dynamic Button** dengan ID: ${id}!`, 
            ephemeral: true 
        });
    }
};
