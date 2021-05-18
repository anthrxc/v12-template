const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
const mongoose = require("mongoose");

client.config = require("./config.js"); // Make all variables in the config.js file available through client.config
["commands", "aliases"].forEach(x => client[x] = new Collection()); // Create collections for the bot commands and their aliases

require("./handlers/command.js")(client); // require the handler and provide the client variable
require("./handlers/event.js")(client);

mongoose.connect(client.config.database.uri, { // Connect to the database
    useNewUrlParser: true,
    useUnifiedTopology: true
})

client.login(client.config.token);
