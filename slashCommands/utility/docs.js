const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const Doc = require('discord.js-docs').default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('docs')
        .setDescription('Search the Discord.js documentation')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Enter the class, method, or property name')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('source')
                .setDescription('Select the documentation source')
                .setRequired(true)
                .addChoices(
                    { name: 'stable', value: 'stable' },
                    { name: 'main', value: 'main' },
                    { name: 'commando', value: 'commando' },
                    { name: 'rpc', value: 'rpc' },
                    { name: 'akairo', value: 'akairo' },
                    { name: 'collection', value: 'collection' },
                    { name: 'builders', value: 'builders' },
                    { name: 'voice', value: 'voice' },
                    { name: 'rest', value: 'rest' }
                )
        ),

    async execute(interaction) {
        const query = interaction.options.getString('query').trim();
        const source = interaction.options.getString('source').trim();

        await interaction.deferReply();

        try {
            
            const doc = await Doc.fetch(source);
            const embed = doc.resolveEmbed(query);

            if (!embed) {
                return interaction.editReply({
                    content: `No documentation found for **${query}** in the **${source}** source.`,
                    MessageFlags: MessageFlags.Ephemeral
                });
            }

            // Retrieve the bot's avatar URL
            const botAvatarURL = interaction.client.user.displayAvatarURL();

            // Modify the embed's author icon to the bot's avatar 
            // because the default djs icon did not render in the embed
            if (embed.author) {
                embed.author.icon_url = botAvatarURL;
            } else {
                embed.author = {
                    name: 'Discord.js Documentation',
                    icon_url: botAvatarURL,
                    url: 'https://discord.js.org/#/docs'
                };
            }

            // Send the modified embed
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(`Error fetching Discord.js documentation from source "${source}":`, error);
            await interaction.editReply({
                content: `An error occurred while fetching the Discord.js documentation from the **${source}** source.`,
                MessageFlags: MessageFlags.Ephemeral
            });
        }
    }
};
