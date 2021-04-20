const { Client, Collection } = require("discord.js");

const client = new Client({ disableMentions: "everyone" });

client.config = require("./config.js");
["commands", "aliases"].forEach(x => client[x] = new Collection());

client.once("ready", () => {
    console.clear();
    console.log("Ready!");
});

require("./handlers/command.js")(client);
client.login(client.config.token);