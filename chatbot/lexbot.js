const { getRAGResponse } = require("./rag");

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "mistral";

// System prompt

const SYSTEM_PROMPTS = 
`Tu es LexBot, un assistant juridique généraliste spécialisé en droit français.
Tu couvres : droit immobilier, droit du travail, droit de la consommation, droit des entreprises, droit civil, droit pénal, etc.
Réponds toujours en français de façon professionnelle.
Tu dois impérativement citer tes sources (lois, articles, jurisprudences) sorties de la partie "[Extrait juridique potentiellement pertinent]" si elle est présente.
Tu dois uniquement répondre au prompt de l'utilisateur et n'utiliser les extraits juridiques que s'ils sont pertinents. Si les extraits ne sont pas pertinents, ne les utilise pas et ne les mentionne pas.
Tu as inderdiction formelle de répondre à des questions hors sujet (ex: cuisine, voyages, etc.) : dans ce cas, répond simplement "Désolé, je ne peux répondre qu'à des questions juridiques.".`;






// Ollama call

async function askOllama(history, updateResponseFunction, footerTxt = null) {
    const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL, messages: history, stream: true }),
        signal: AbortSignal.timeout(240_000)
    });

    if (!res.ok) throw new Error(`Ollama a répondu avec une erreur ${res.status}`);

    let fullResponse = "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        
        if (!done) {
            const chunk = decoder.decode(value);
            const data = await JSON.parse(chunk);

            fullResponse += data.message.content;
            updateResponseFunction(fullResponse, false, footerTxt);
            continue;
        }

        updateResponseFunction(fullResponse, true, footerTxt);
        break;
    }

    return fullResponse;
}

// Session management (per user, in-memory)

const FREE_LIMIT = 10;

// userId -> { history: [], count: 0 }
const sessions = new Map();

function getSession(userId) {
    if (!sessions.has(userId)) {
        sessions.set(userId, { history: [], count: 0 });
    }
    return sessions.get(userId);
}






// Main handler

async function handleChat(userId, message, updateResponseFunction) {
    const session = getSession(userId);

    if (session.count >= FREE_LIMIT) {
        return false // Indique que la limite est atteinte
    }

    const ragResponse = await getRAGResponse(message);

    if (session.history.length === 0) {
        session.history.push({ role: "system", content: SYSTEM_PROMPTS });
    }

    if (ragResponse) message += `\n\n[Extrait juridique potentiellement pertinent] :\n${ragResponse}`;
    session.history.push({ role: "user", content: message });

    let footer = "LeBot est une IA. Vérifiez toujours les informations fournies et consultez un professionnel du droit si nécessaire.";
    const remaining = FREE_LIMIT - session.count - 1;
    if (remaining <= 3 && remaining > 0) {
        footer += `\n ⚠️ Il vous reste **${remaining}** message(s) gratuit(s). Passez à LexBot Pro pour des conversations illimitées !`;
    }

    const response = await askOllama(session.history, updateResponseFunction, footer);

    session.history.push({ role: "assistant", content: response });
    session.count++;
}





module.exports = { handleChat };
