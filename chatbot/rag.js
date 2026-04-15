const { ChromaClient } = require("chromadb");
const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const { pipeline } = require("@huggingface/transformers")


const client = new ChromaClient({ path: "http://localhost:8000" });

async function textToVector(text, vectorizer) {
    const output = await vectorizer(text);
    return Array.from(output[0][0]);
}


const emptyEmbedder = { generate: async (texts) => texts.map(() => []) };


async function setupRAG() {
    const collection = await client.getOrCreateCollection({ name: "Lois", embeddingFunction: emptyEmbedder });
    const vectorizer = await pipeline("feature-extraction", "Xenova/multilingual-e5-small");

    
    if ((await collection.count()) > 0) return;

    for (const file of fs.readdirSync("../law_texts")) {

        const buffer = fs.readFileSync(`../law_texts/${file}`);
        const dataParser = new PDFParse({ data: buffer });
        const data = await dataParser.getText();

        console.log(`Indexing ${file} into ${data.text.length / 1000} chunks...`);
        const chunks = data.text.match(/.{1,1000}/gs) || [];

        for (const [index, chunk] of chunks.entries()) {
            process.stdout.write(`\rIndexing ${file} - Chunk ${index}`);
            const vector = await textToVector(chunk, vectorizer);

            await collection.add({
                ids: [`${file}-${index}`],
                metadatas: [{ source: file }],
                embeddings: [vector],
                documents: [chunk]
            });
        }
        console.log(`\nFinished indexing ${file}.`);
    }
}





async function getRAGResponse(query) {
    const vectorizer = await pipeline("feature-extraction", "Xenova/multilingual-e5-small");

    try {
        const collection = await client.getCollection({ name: "Lois", embeddingFunction: emptyEmbedder });
        const results = await collection.query({
            queryEmbeddings: [await textToVector(query, vectorizer)],
            nResults: 3
        });

        const output = results.documents[0].map((doc, i) => `Source: ${results.metadatas[0][i].source}\n${doc}`).join("\n\n")
        return output;
    }

    catch (err) {
        console.log(err)
        return null;
    }
}


module.exports = { 
    setupRAG,
    getRAGResponse 
}