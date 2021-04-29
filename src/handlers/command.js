const { readdir, readdirSync } = require("fs");
const { sep } = require("path");

module.exports = (client) => {
    var dir = `${process.cwd()}${sep}src${sep}commands`
    
    try {
        readdir(dir, (err, subDirs) => {
            if(err) throw err;
            
            subDirs.forEach(subDir => {
                dir = `${dir}${sep}${subDir}${sep}` // change the directory variable to contain the current directory
                const commands = readdirSync(`${dir}`).filter(f => f.endsWith(".js")); // Filter the commands variable so it only includes files that end with ".js"
                
                for(const command of commands) {
                    const cmd = require(`${dir}${command}`); // Require the command file

                    if(cmd.help) { // Check if the command file exports a help object
                        if(!cmd.help.name) throw new TypeError(`Command at ${dir} does not export a name value.`);                                                               // These lines simply check
                        if(!typeof cmd.help.name == "string") throw new TypeError(`Command at ${dir} exports an invalid name value, it can only be a string.`);                  // if the help object exports any
                        if(!cmd.help.description) throw new TypeError(`Command at ${dir} does not export a description value.`);                                                 // values that our dynamic help command
                        if(!typeof cmd.help.description == "string") throw new TypeError(`Command at ${dir} exports an invalid description value, it can only be a string.`);    // requires to display the command help
                                                                                                                                                                                 // and if not, it throws an error.
                        if(client.commands.get(cmd.help.name)) throw new TypeError(`Command at ${dir} exports the same name value as another command.`);
                        client.commands.set(cmd.help.name, cmd); // Add the command to the collection of commands defined at index.js:5:1

                        if(cmd.help.aliases) {
                            if(typeof cmd.help.aliases == "string") cmd.help.aliases = [cmd.help.aliases] // If the exported alias is a string, convert it to an array with the only element being that string
                            else if(typeof cmd.help.aliases == "object") {
                                cmd.help.aliases.forEach(alias => { // Loop through all aliases and see if another command already has that alias
                                    if(client.aliases.get(alias)) throw new TypeError(`Command at ${dir} exports the same alias value as another command.`);
                                    client.aliases.set(alias, cmd.help.name); // if not, add the alias to the collection of aliases defined at index.js:5:1
                                });
                            }
                            else throw new TypeError(`Command at ${dir} exports an invalid alias value. Value must be a string or object.`); // If the type of the alias value isn't a string or an object, throw an error
                        };
                        if(cmd.help.ownerOnly == true && cmd.help.requiredPerms) throw new TypeError(`Command at ${dir} has a setting conflict: ownerOnly and requiredPerms cannot be used together.`); // Owners already have full permission over the bot, if a command is "ownerOnly", it shouldn't require any additional permissions
                        if(!typeof cmd.help.ownerOnly == "boolean") throw new TypeError(`Command at ${dir} uses an invalid value for the ownerOnly setting.`); // the ownerOnly setting can only be a boolean -- true or false
                        if(cmd.help.requiredPerms) {
                            if(typeof cmd.help.requiredPerms == "string") cmd.help.requiredPerms = [cmd.help.requiredPerms] // read line 29 -- instead of aliases, this is done to required permissions
                            else if(typeof cmd.help.requiredPerms == "object") {
                                cmd.help.requiredPerms.forEach(permission => {
                                    const permissions = [
                                        "ADMINISTRATOR",
                                        "CREATE_INSTANT_INVITE",
                                        "KICK_MEMBERS",
                                        "BAN_MEMBERS",
                                        "MANAGE_CHANNELS",
                                        "MANAGE_GUILD",
                                        "ADD_REACTIONS",
                                        "VIEW_AUDIT_LOG",
                                        "PRIORITY_SPEAKER",
                                        "STREAM",
                                        "VIEW_CHANNEL",
                                        "SEND_MESSAGES",
                                        "SEND_TTS_MESSAGES",
                                        "MANAGE_MESSAGES",
                                        "EMBED_LINKS",
                                        "ATTACH_FILES",
                                        "READ_MESSAGE_HISTORY",
                                        "MENTION_EVERYONE",
                                        "USE_EXTERNAL_EMOJIS",
                                        "VIEW_GUILD_INSIGHTS",
                                        "CONNECT",
                                        "SPEAK",
                                        "MUTE_MEMBERS",
                                        "DEAFEN_MEMBERS",
                                        "MOVE_MEMBERS",
                                        "USE_VAD",
                                        "CHANGE_NICKNAME",
                                        "MANAGE_NICKNAMES",
                                        "MANAGE_ROLES",
                                        "MANAGE_WEBHOOKS",
                                        "MANAGE_EMOJIS"
                                    ]
                                    if(!permissions.includes(permission.toUpperCase())) throw new TypeError(`Command at ${dir} requires an invalid permission: ${permission}.`); // Loop through a list of valid Discord permissions and see whether or not the exported permission is in that list
                                });
                            }
                            else throw new TypeError(`Command at ${dir} exports an invalid requiredPerms value. Value must be a string or object.`); // read line 36 -- instead of aliases, this is done to required permissions
                        };             
                    }
                    else throw new TypeError(`Command at ${dir} does not export a help object.`); // Throw an error if there is no help object in a command
                }
            })
        })
    }
    catch(e) {
        throw e // If an error is encountered, throw it
    }
    finally {
        console.log(`Loaded all commands!`);
    }
}