const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["commands", "h"],
    category: "utility",
    description: "Displays a list of available commands",
    async execute(message, args) {
        const excludedCategories = ["nonprefix"]; // Categories to exclude
        const prefix = "!"; // Change this if your prefix is different

        const howTo = 
            `📌 **How to use the bot:**\n` +
            `- Use all commands with the prefix \`${prefix}\`\n` +
            `- To view commands in a specific category: \`${prefix}help <category>\`\n` +
            `- To view details of a command: \`${prefix}help <command>\`\n` +
            `- To see this command list again: \`${prefix}help\``;

        const categoryEmojis = {
            anime: "🎴",
            utility: "🛠️",
            fun: "🎉",
            misc: "*️⃣",
        };

        const filteredCommands = message.client.textCommands.filter(
            (cmd) => !excludedCategories.includes(cmd.category)
        );

        const categories = [...new Set(filteredCommands.map((cmd) => cmd.category))];

        if (!args[0]) {
            // If no arguments are provided, show the list of categories with their commands
            const embed = new EmbedBuilder()
                .setColor("#00ff99")
                .setTitle("📜 Command List")
                .setDescription(howTo)
                .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

            categories.forEach((category) => {
                const commandsInCategory = filteredCommands
                    .filter((cmd) => cmd.category === category)
                    .map((cmd) => `\`${cmd.name}\``)
                    .join(", ");
                embed.addFields({
                    name: `${categoryEmojis[category] || ""} **${category.charAt(0).toUpperCase() + category.slice(1)}**`,
                    value: commandsInCategory || "No commands available",
                    inline: false
                });
            });

            return message.reply({ embeds: [embed] });
        }

        const categoryRequested = args[0].toLowerCase();
        if (categories.includes(categoryRequested)) {
            // If input is a category, show the commands in that category
            const commandsInCategory = filteredCommands
                .filter((cmd) => cmd.category === categoryRequested)
                .map((cmd) => `\`${cmd.name}\``)
                .join(", ");

            const embed = new EmbedBuilder()
                .setColor("#00aaff")
                .setTitle(`${categoryEmojis[categoryRequested] || ""} ${categoryRequested.toUpperCase()} Commands`)
                .setDescription(commandsInCategory || "No commands in this category.")
                .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

            return message.reply({ embeds: [embed] });
        }

        // Check if input is a command name or alias
        const command =
            filteredCommands.find((cmd) => cmd.name === args[0]) ||
            filteredCommands.find((cmd) => cmd.aliases && cmd.aliases.includes(args[0]));

        if (!command) {
            return message.reply("❌ Command or category not found.");
        }

        // Embed for detailed command info
        const embed = new EmbedBuilder()
            .setColor("#ff9900")
            .setTitle(`ℹ️ Command: ${command.name}`)
            .addFields(
                { name: "📝 Description", value: command.description || "No description available", inline: false },
                { name: "🔀 Aliases", value: command.aliases.length ? command.aliases.join(", ") : "-", inline: false },
                { name: "📂 Category", value: command.category.charAt(0).toUpperCase() + command.category.slice(1), inline: false }
            )
            .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

        return message.reply({ embeds: [embed] });
    },
};
