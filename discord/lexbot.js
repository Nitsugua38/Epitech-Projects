const { getRAGResponse } = require("./rag");

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "mistral";

// System prompt

const SYSTEM_PROMPTS = 
`Tu es LexBot, un assistant juridique généraliste spécialisé en droit français.
Tu couvres : droit immobilier, droit du travail, droit de la consommation, droit des entreprises, droit civil, droit pénal, etc.
Réponds toujours en français de façon professionnelle.
Tu dois impérativement citer tes sources (lois, articles, jurisprudences) sorties de la partie "[Extrait juridique potentiellement pertinent]" si elle est présente.`;






// Ollama call

async function askOllama(history) {
    const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL, messages: history, stream: false }),
        signal: AbortSignal.timeout(120_000)
    });
    if (!res.ok) throw new Error(`Ollama a répondu avec une erreur ${res.status}`);
    const data = await res.json();
    return data.message.content;
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

async function handleChat(userId, message) {
    const session = getSession(userId);

    if (session.count >= FREE_LIMIT) {
        return {
            text: "🔒 Vous avez atteint la limite gratuite de **10 messages**.\nPassez en **LexBot Pro** pour des conversations illimitées !",
            domain: "general"
        };
    }

    const ragResponse = await getRAGResponse(message);

    if (session.history.length === 0) {
        session.history.push({ role: "system", content: SYSTEM_PROMPTS });
    }

    if (ragResponse) message += `\n\n[Extrait juridique potentiellement pertinent] :\n${ragResponse}`;
    session.history.push({ role: "user", content: message });

    const response = await askOllama(session.history);

    session.history.push({ role: "assistant", content: response });
    session.count++;

    const remaining = FREE_LIMIT - session.count;
    let text = response;

    if (remaining <= 3 && remaining > 0) {
        text += `\n\n> ⚠️ Il vous reste **${remaining}** message(s) gratuit(s).`;
    }

    
    return text;
}





module.exports = { handleChat };
