const { MessageEmbed } = require("discord.js");
const { readdir, readdirSync } = require("fs");
const { sep } = require("path");

module.exports = {
    name: "reload",
    aliases: ["r"],
    description: "Reloads a provided command.",
    args: "<command name>",
    minArgs: 1,
    maxArgs: 1,
    ownerOnly: true,
    execute: async(message, args, client) => {
        const { channel, author } = message;
        
        let command = args[0].toLowerCase();
        if(!command) {
            channel.send(
                new MessageEmbed()
                .setColor(client.config.embed.color)
                .setAuthor(`${author.tag}`, author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
                .setTitle("Error!")
                .addField("Invalid argument", "You have provided an invalid command.")
                .setFooter(client.config.embed.footer)
            );
            return;
        };

        channel.send('Reloading...').then(msg => {
            readdir(`${process.cwd()}/src/commands`, (err, files) => {
                if(err) throw err;

                files.forEach(subDir => {
                    const commands = readdirSync(`${process.cwd()}${sep}src${sep}commands${sep}${subDir}`).filter(f => f.endsWith(".js"));

                    for(const command of commands) {
                        if(command.split(".")[0] == args[0]) {
                            delete require.cache[require.resolve(`${process.cwd()}${sep}src${sep}commands${sep}${subDir}${sep}${command}`)];
                            client.commands.delete(command.split(".")[0]);
                            
                            const cmd = require(`${process.cwd()}${sep}src${sep}commands${sep}${subDir}${sep}${command}`);
                            client.commands.set(cmd.name, cmd);
                            cmd.aliases.forEach(alias => {
                                client.aliases.set(alias, cmd.name);
                            });
                        };
                    };
                });
            });
            msg.edit(`Successfully reloaded the \`${args[0]}\` command.`);
        });
    }
};