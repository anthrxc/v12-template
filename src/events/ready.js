module.exports = async (client) => {
    const { database } = client.config
    console.clear();

    if(database.type == "mongodb") {
        const mongoose = require("mongoose");
        await mongoose.connect(database.uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await mongoose.then(mongo => {
            try {
                console.log("Successfully connected to MongoDB!");
            }
            finally {
                mongo.connection.close();
            };
        });
    }
    else if(database.type == "quickdb") {
        const quickdb = require("quick.db");
        console.log("Successfully connected to quick.db!")
    };
    
    console.log(`-----------------------`);
    console.log(`${client.user.username}`);
    console.log(`Logged into Discord and ready to use!`);
    console.log(`-----------------------`);
    
    setTimeout(() => {
        console.clear();
    }, 1500);
};