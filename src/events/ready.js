const { version } = require("../../package.json");

module.exports = () => {
    console.clear(); // Does what you think it does; clears the console
    
    console.log(`-----------------------`);
    console.log(`DJS Template Bot v${version}`);
    console.log(`Logged into Discord and ready to use!`);
    console.log(`-----------------------`);
    
    setTimeout(() => {
        console.clear(); // Clears the console after 1.5 seconds (1500 miliseconds)
    }, 1500);
};