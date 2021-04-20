const { readdir, readdirSync } = require("fs");
const { sep } = require("path");

module.exports = (client) => {
    const dir = `${process.cwd()}/src/commands`

    try {
        readdir(dir, (err, files) => {
            if(err) throw err;

            files.forEach(subDir => {
                const commands = readdirSync(`${dir}${sep}${subDir}`).filter(f => f.endsWith(".js"));

                for(const command of commands) {
                    const cmd = require(`${dir}/${subDir}/${command}`);
                    
                    if(client.commands.get(cmd.name)) console.log(`Command at ${dir}/${subDir}/${command} has the same name as another command!`);
                    client.commands.set(cmd.name, cmd);

                    if(cmd.aliases) {
                        if(typeof cmd.aliases == "string") cmd.aliases = [cmd.aliases];
                        cmd.aliases.forEach(alias => {
                            if(client.aliases.get(alias)) console.log(`Command at ${dir}/${subDir}/${command} has the same alias as another command!`);
                        });
                    };
                    if(!cmd.execute) console.log(`Command at ${dir}/${subDir}/${command} does not have an execute function!`)
                    if(!cmd.description) console.log(`Command at ${dir}/${subDir}/${command} does not have a description!`)
                };
            });
        })
    } catch(error) {
        throw error
    } finally {
        console.log("Successfully loaded all commands.");
    };
};