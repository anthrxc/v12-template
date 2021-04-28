const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });

client.config = require("./config.js"); // Make all variables in the config.js file available through client.config
["commands", "aliases"].forEach(x => client[x] = new Collection()); // Create collections for the bot commands and their aliases

require("./handlers/command.js")(client);
require("./handlers/event.js")(client);

client.login(client.config.token);