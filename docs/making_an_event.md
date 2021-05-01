# Making an event
Making events is simple. You don't need a *run* or *help* export.
All you need to do is export your event code with the ***client*** argument, followed by the event arguments.

***Make sure that your file name is the same as the name of the event!***

*guildMemberAdd* example:
```javascript
// File name: guildMemberAdd.js
module.exports = async(client, member) => {
    console.log(`${member} has joined ${member.guild.name}!`);
};
```