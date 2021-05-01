module.exports = (client) => {
    console.clear(); // Does what you think it does; clears the console
    
    console.log(`-----------------------`);
    console.log(`${client.user.username}`);
    console.log(`Logged into Discord and ready to use!`);
    console.log(`-----------------------`);
    
    setTimeout(() => {
        console.clear(); // Clears the console after 1.5 seconds (1500 miliseconds)
    }, 1500);
};