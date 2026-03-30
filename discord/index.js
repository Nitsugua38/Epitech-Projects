const { executeCommand } = require("./prompt.js");
const dotenv = require("dotenv");
dotenv.config();

// Import Discord.js and create a "client" = bot instance
const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



// Tells us when the bot is ready
client.on(Events.ClientReady, () => {
    console.log(`${client.user.tag} is ready and online!`);
});



// Executes the command for chatbot interactions
client.on(Events.InteractionCreate, async interaction => {
    await executeCommand(interaction);
})


// Prevents the bot from crashing on errors
process.on('unhandledRejection', error => {
	console.log('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.log('Uncaught exception:', error);
});




// Login to Discord with the bot token
client.login(process.env.TOKEN);
module.exports = client;