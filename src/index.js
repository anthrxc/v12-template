require("dotenv").config({ path: `${process.cwd()}/src/.env`});

const { Client, Collection } = require("discord.js");

const client = new Client({ disableMentions: "everyone" });

client.config = require("./config.js");
["commands", "aliases"].forEach(x => client[x] = new Collection());



client.login(client.config.token);