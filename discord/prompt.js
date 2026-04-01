const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PDFParse } = require("pdf-parse");

const { handleChat } = require("./lexbot.js");


const executeCommand = async (interaction) => {

    const prompt = interaction.options.getString("prompt");
    const file = interaction.options.getAttachment("file");
    const userID = interaction.user.id;

    // Tells Discord to wait before responding, avoiding to timeout.
    await interaction.deferReply();


    pdfExtractedText = "";

    // Converts PDF to JSON for the model
    if (file && file.contentType === "application/pdf") {
        
        const pdfParser = new PDFParse({url: file.url});
        pdfExtractedText = await pdfParser.getText();

    }


    const pdtCONTEXT = pdfExtractedText != "" ? `Voici le contenu du PDF dont je dispose :\n${pdfExtractedText.text}` : "";

    const response = await handleChat(userID, `${prompt}\n${pdtCONTEXT}`);

    await interaction.editReply({embeds: [new EmbedBuilder().setTitle(`Consultation LexBot`).setDescription(response.substring(0, 4096))] });

}






module.exports = {
    data: new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Prompter ElizaBot")
        .addStringOption(option => option.setName("prompt").setDescription("Entrez votre requête pour ElizaBot.").setRequired(true))
        .addAttachmentOption(option => option.setName("file").setDescription("Optionnel : attachez un fichier PDF ou autre pour qu'ElizaBot puisse l'analyser.")),

    
    executeCommand: executeCommand
}