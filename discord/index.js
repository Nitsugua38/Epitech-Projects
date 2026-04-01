const { execSync } = require("child_process");
const { executeCommand } = require("./prompt.js");
const dotenv = require("dotenv");
dotenv.config();

// --------- DISCORD ----------

// Import Discord.js and create a "client" = bot instance
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { setupRAG } = require("./rag.js");
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



((async () => {
    console.log("Initialisation de LexBot RAG... Veuillez patienter...");
    await setupRAG();

    // --------- OLLAMA CHECKS AND START ----------

    console.log("Vérification d'Ollama...")
    try {
    
        execSync("ollama ps", { stdio: "inherit" });

    } catch (err) {
    
        try {

            console.log("Démarrage d'Ollama...");
            execSync("sudo systemctl start ollama", { stdio: "inherit" });

        } catch (err) {
            console.error(err);
            process.exit(1);
        }

    } finally {
        
        try {

            console.log("Vérification du modèle...");
            execSync(`ollama pull mistral`, { stdio: "inherit" });
            console.log("Ollama est prêt!");

        } catch (err) {
            console.error(err);
            process.exit(1);
        }

    }


    // Login to Discord with the bot token 
    client.login(process.env.TOKEN);

})());


module.exports = client;