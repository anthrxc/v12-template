const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });

client.config = require("./config.js");
client.commands = new Collection();
client.aliases = new Collection();



client.login(client.config.token)