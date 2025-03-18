module.exports = {
    customId: "static_select",
    handler: async (client, interaction) => {
        const selectedValue = interaction.values[0];

        await interaction.reply({ content: `📌 Kamu memilih **${selectedValue}** dari Select Menu Statis.`, ephemeral: true });
    }
};
