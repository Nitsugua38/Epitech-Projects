// This script sends Discord the list of our bot's commands


const { REST, Routes } = require('discord.js');

const dotenv = require("dotenv");
dotenv.config();


const commandsList = [];
const command = require("./prompt.js");
commandsList.push(command.data);



const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commandsList },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();