const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });

client.config = require("./config.js"); // Make all variables in the config.js file available through client.config
["commands", "aliases"].forEach(x => client[x] = new Collection()); // Create collections for the bot commands and their aliases

require("./handlers/command.js")(client); // require the handlers and provide the client variable
require("./handlers/event.js")(client);

if(client.config.database) {
    if(client.config.database.type.toLowerCase() === "quickdb") client.database = require("quick.db"); // If the database type is quick.db, then require it
    else if(client.config.databse.type.toLowerCase() === "mongodb") { // If the database type is mongodb, connect to the database
        const mongoose = require("mongoose");
        mongoose.connect(client.config.database.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.database == mongoose;
    };
};

client.login(client.config.token);
