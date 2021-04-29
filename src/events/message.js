const { MessageEmbed } = require("discord.js");

module.exports = async(client, message) => {
    const { owners, prefix, color, emoji, footer } = client.config;   // Destructure the variables inside {} from the client.config variable
    const { guild, channel, author, member, content, mentions } = message;    // ^^ except from the message variable
    
    const args = content.slice(prefix.length).trim().split(/ +/g); // Remove the prefix from the args, remove whitespace surrounding the string, and split it on every space.
    const cmd = args.shift().toLowerCase() // Takes the first element of the args array and converts it to lower case so commands aren't case sensitive, allowing for capitalization mistakes

    let command; // undefined variable (variable with no value)

    if(mentions.users.get(client.user.id)) {
        channel.send(
            new MessageEmbed()
            .setColor(color.positive)
            .setAuthor(author.tag, author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle("Hello! :smile:")
            .setDescription(`This is a discord.js template bot made by [aanthr0](https://github.com/aanthr0 "GitHub").\nTo display the bot's commands, type \`${prefix}help\`.`)
            .setFooter(footer)
        );
        return;
    };

    if(!content.startsWith(prefix) || !guild || !cmd) return; // If the message content doesn't start with a prefix OR has no guild OR there is no command, ignore the message.
    if(!member) member = await guild.fetchMember(author); // If the message member (message author as a GuildMember) doesn't exist (isn't in cache), fetch the member (which automatically caches it)

    if(client.commands.has(cmd)) command = client.commands.get(cmd); // If the command exists, put that command inside the command variable (defined ln10 col5)
    else if(client.aliases.has(cmd)) command = client.commands.get(client.aliases.get(cmd)) // If the command doesn't exist, check if it's an alias. If it is, put it inside the command variable.

    const { ownerOnly, requiredPerms } = command.help // read line 4

    if(ownerOnly == true && !owners.includes(author.id)) {
        channel.send(
            new MessageEmbed()
            .setColor(color.negative)
            .setAuthor(author.tag, author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`${emoji.negative} Error!`)
            .addField("Invalid permissions", "To run this command, you need to be a bot owner!")
            .setFooter(footer)
        );
        return; // don't continue with the rest of the code
    }
    if(requiredPerms && requiredPerms.length) { // if there are required permissions
        for(perm of command.help.requiredPerms) { // loop through the permissions
            if(!member.hasPermission(perm)) { // If the member doesn't have any of the required permissions, send an error
                channel.send(
                    new MessageEmbed()
                    .setColor(color.negative)
                    .setAuthor(author.tag, author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setTitle(`${emoji.negative} Error!`)
                    .addField("Invalid permissions", `You need to have the \`${perm}\` permission to run this command!`)
                    .setFooter(footer)
                );
                return; // don't continue with the rest of the code
            };
        };
    };

    if(command) command.run(client, message, args); // If the command exists, run it
};