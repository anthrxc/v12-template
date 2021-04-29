const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
    const { color, emoji, footer } = client.config;
    const { channel, author } = message;

    if(!args.length) {
        channel.send(
            new MessageEmbed()
            .setColor(color.green)
            .setAuthor(author.tag, author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
        )
    }
};

module.exports.help = {
    name: "help",
    description: "Shows you a list of commands and information about them."
}