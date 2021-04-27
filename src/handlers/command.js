const { readdir, readdirSync } = require("fs");
const { sep } = require("path");
const { sucess, error } = require("log-symbols");

module.exports = (client) => {
    var dir = `${process.cwd()}${sep}src${sep}commands`
    
    client.loadCommands = () => {
        readdir(dir, (err, files) => {
            if(err) throw err;

            files.forEach(subDir => {
                dir = `${dir}${sep}${subDir}`
                const commands = readdirSync(`${dir}`).filter(f => f.endsWith(".js"));

                for(const command of commands) {
                    dir = `${dir}${sep}${command}`
                    const cmd = require(`${dir}/${subDir}/${command}`);

                    if(cmd.help) {
                        if(!cmd.help.name) throw new TypeError(`${error} Command at ${dir} does not export a name value.`);
                        if(!cmd.help.description) throw new TypeError(`${error} Command at ${dir} does not export a description value.`);
                        if(client.commands.get(cmd.help.name)) throw new TypeError(`${error} Command at ${dir} exports the same name value as another command.`);

                        client.commands.set(cmd.help.name, cmd)

                        if(cmd.help.aliases) {
                            if(typeof cmd.help.aliases == "string") cmd.help.aliases = [cmd.help.aliases]
                            else if(typeof cmd.help.aliases == "object") {
                                cmd.help.aliases.forEach(alias => {
                                    if(client.aliases.get(alias)) throw new TypeError(`${error} Command at ${dir} exports the same alias value as another command.`);
                                    client.aliases.set(alias, cmd.help.name);
                                });
                            }
                            else throw new TypeError(`${error} Command at ${dir} exports an invalid alias value. Value must be a string or object.`);
                        };
                        if(cmd.help.ownerOnly == true && cmd.help.requiredPerms) throw new TypeError(`${error} Command at ${dir} has a setting conflict: ownerOnly and requiredPerms cannot be used together.`);
                        if(!typeof cmd.help.ownerOnly == "boolean") throw new TypeError(`${error} Command at ${dir} uses an invalid value for the ownerOnly setting.`);                        
                    }
                    else throw new TypeError(`${error} Command at ${dir} does not export a help object.`);

                }
            })
        })
    }
}