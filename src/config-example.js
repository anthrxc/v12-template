module.exports = {
    owners: ["ALL", "OWNER", "IDs", "HERE"],
    database: {
        URI: "DATABASE-CONNECTION-URI-HERE"
        /*
         * You can also provide the username
         * and password for the database login
         * if you don't already do that
         * in the URI connection string.
         *
         * If you won't use a database,
         * delete this field.
         */    
    },
    token: "BOT-TOKEN-HERE",
    color: {
        positive: "GREEN", // #2ECC71
        negative: "RED" // #E74C3C
    },
    emoji: {
        positive: ":green_circle:", // For custom server emojis, use "<:emojiName:emojiID>"
        negative: ":red_circle:" // which you can get by typing "\:emojiName:"
    },
    footer: "EMBED-FOOTER"
}