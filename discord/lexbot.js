const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "mistral";

// ── System prompts ────────────────────────────────────────────────────────────

const SYSTEM_PROMPTS = {
    bail: `Tu es LexBot, un assistant juridique spécialisé en droit immobilier français.
Tu aides les locataires et propriétaires à comprendre leurs droits et obligations.
Références clés : Loi du 6 juillet 1989, Art. 21 (restitution caution : 1 mois si état identique, 2 mois si dégradations), Décret 26 août 1987 (réparations locatives), Loi ALUR 2014.
Réponds toujours en français, cite les articles pertinents, et recommande l'ADIL pour les cas complexes.`,

    travail: `Tu es LexBot, un assistant juridique spécialisé en droit du travail français.
Tu aides salariés et employeurs à comprendre leurs droits.
Références clés : Code du travail L1232-1 (licenciement), L1152-1 (harcèlement moral), L3141-1 (congés payés), barème Macron (indemnités prud'hommales).
Réponds toujours en français, cite les articles pertinents, et oriente vers le Conseil de prud'hommes si nécessaire.`,

    consommation: `Tu es LexBot, un assistant juridique spécialisé en droit de la consommation français.
Tu aides les consommateurs face aux professionnels.
Références clés : Code de la consommation L212-1 (clauses abusives), L217-3 (garantie légale 2 ans), L224-25-12 (rétractation 14 jours e-commerce).
Réponds toujours en français, cite les articles pertinents, et oriente vers la DGCCRF si nécessaire.`,

    entreprise: `Tu es LexBot, un assistant juridique spécialisé en droit des entreprises français.
Tu aides les PME à sécuriser leurs pratiques contractuelles.
Références clés : Code civil 1101-1231 (contrats), RGPD (données personnelles), Code de commerce L441-1 (délais de paiement), Loi Hamon (CGV).
Réponds toujours en français de façon professionnelle, et recommande un avocat pour les décisions stratégiques.`,

    general: `Tu es LexBot, un assistant juridique généraliste spécialisé en droit français.
Tu couvres : droit immobilier, droit du travail, droit de la consommation, droit des entreprises.
Réponds toujours en français, cite les textes de loi pertinents quand tu en es certain, et rappelle que LexBot ne remplace pas un avocat.
Oriente vers les ressources gratuites : ADIL, service-public.fr, Défenseur des droits.`
};

// ── Intent detection ──────────────────────────────────────────────────────────

const KEYWORDS = {
    bail:         ["loyer", "propriétaire", "locataire", "caution", "bail", "logement", "appartement", "expulsion", "charges", "quittance", "dépôt de garantie", "état des lieux", "préavis", "bailleur", "location"],
    travail:      ["licenciement", "contrat", "cdi", "cdd", "salaire", "employeur", "arrêt maladie", "harcèlement", "démission", "prud'hommes", "congés", "rupture conventionnelle", "salarié", "patron", "chômage"],
    consommation: ["remboursement", "garantie", "achat", "vendeur", "sav", "retour", "livraison", "arnaque", "rétractation", "commande", "produit défectueux", "abonnement", "résiliation", "clause abusive"],
    entreprise:   ["cgv", "rgpd", "contrat commercial", "fournisseur", "facture", "société", "sarl", "sas", "entreprise", "données personnelles", "mentions légales", "conformité"]
};

function detectIntent(message) {
    const lower = message.toLowerCase();
    const scores = Object.fromEntries(Object.keys(KEYWORDS).map(d => [d, 0]));
    for (const [domain, keywords] of Object.entries(KEYWORDS)) {
        for (const kw of keywords) {
            if (lower.includes(kw)) scores[domain]++;
        }
    }
    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    return best[1] > 0 ? best[0] : "general";
}

// ── Ollama call ───────────────────────────────────────────────────────────────

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

// ── Session management (per user, in-memory) ──────────────────────────────────

const FREE_LIMIT = 10;
const DOMAIN_EMOJI = { bail: "🏠", travail: "💼", consommation: "🛒", entreprise: "🏢", general: "⚖️" };

// userId -> { history: [], count: 0 }
const sessions = new Map();

function getSession(userId) {
    if (!sessions.has(userId)) {
        sessions.set(userId, { history: [], count: 0 });
    }
    return sessions.get(userId);
}

// ── Main handler ──────────────────────────────────────────────────────────────

async function handleChat(userId, message) {
    const session = getSession(userId);

    if (session.count >= FREE_LIMIT) {
        return {
            text: "🔒 Vous avez atteint la limite gratuite de **10 messages**.\nPassez en **LexBot Pro** pour des conversations illimitées !",
            domain: "general"
        };
    }

    const domain = detectIntent(message);

    if (session.history.length === 0) {
        session.history.push({ role: "system", content: SYSTEM_PROMPTS[domain] });
    }

    session.history.push({ role: "user", content: message });

    const response = await askOllama(session.history);

    session.history.push({ role: "assistant", content: response });
    session.count++;

    const remaining = FREE_LIMIT - session.count;
    let text = response;
    if (remaining <= 3 && remaining > 0) {
        text += `\n\n> ⚠️ Il vous reste **${remaining}** message(s) gratuit(s).`;
    }

    return { text, domain };
}

module.exports = { handleChat, DOMAIN_EMOJI };
