const { SlashCommandBuilder } = require("discord.js");
const { PDFParse } = require("pdf-parse");


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












    await interaction.editReply(`Requête reçue : ${prompt}\n${file ? `Vous avez envoyé un fichier : ${file.url}\n${pdfExtractedText.text}` : "Vous n'avez pas envoyé de ficher"}`);

}






module.exports = {
    data: new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Prompter ElizaBot")
        .addStringOption(option => option.setName("prompt").setDescription("Entrez votre requête pour ElizaBot.").setRequired(true))
        .addAttachmentOption(option => option.setName("file").setDescription("Optionnel : attachez un fichier PDF ou autre pour qu'ElizaBot puisse l'analyser.")),

    
    executeCommand: executeCommand
}