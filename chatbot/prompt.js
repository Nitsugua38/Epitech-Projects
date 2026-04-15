const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const { PDFParse } = require("pdf-parse");

const { handleChat } = require("./lexbot.js");


const executeCommand = async (interaction) => {

    const prompt = interaction.options.getString("prompt");
    const file = interaction.options.getAttachment("file");
    const userID = interaction.user.id;

    // Tells Discord to wait before responding, avoiding to timeout.
    const embedThinking = new EmbedBuilder().setTitle(`Consultation LexBot`).setDescription(":hourglass: LexBot réfléchit...");
    await interaction.reply({embeds: [embedThinking] });


    pdfExtractedText = "";

    // Converts PDF to JSON for the model
    if (file && file.contentType === "application/pdf") {
        
        const pdfParser = new PDFParse({url: file.url});
        pdfExtractedText = await pdfParser.getText();

    }


    const pdtCONTEXT = pdfExtractedText != "" ? `Voici le contenu du document dont je dispose :\n${pdfExtractedText.text}` : "";






    // Streaming LLM answer: update every 2 seconds.
    var timeSinceLastResponse = Date.now();

    const updateResponse = async (incompleteResponse, isFinished, footer = null) => {
        if (Date.now() - timeSinceLastResponse > 2000 || isFinished) {
            const embed = new EmbedBuilder().setTitle(`Consultation LexBot ${isFinished ? "" : ":hourglass:"}`).setDescription(`${incompleteResponse.substring(0, 4080)}${isFinished ? "" : " :white_circle:"}`).setColor(isFinished ? Colors.Green : Colors.Yellow);
            if (footer) embed.setFooter({text: footer});
            
            await interaction.editReply({embeds: [embed] });
            timeSinceLastResponse = Date.now();
        }
    }

    const response = await handleChat(userID, `${prompt}\n${pdtCONTEXT}`, updateResponse);
    
    
    if (response === false) {
        const embed = new EmbedBuilder().setTitle(`Consultation LexBot`).setDescription(`🔒 Vous avez atteint la limite gratuite de **10 messages**.\nPassez en **LexBot Pro** pour des conversations illimitées !`);
        await interaction.editReply({embeds: [embed] });
    }
}






module.exports = {
    data: new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Prompter LexBot")
        .addStringOption(option => option.setName("prompt").setDescription("Entrez votre requête pour LexBot.").setRequired(true))
        .addAttachmentOption(option => option.setName("file").setDescription("Optionnel : attachez un fichier PDF ou autre pour que LexBot puisse l'analyser.")),

    
    executeCommand: executeCommand
}