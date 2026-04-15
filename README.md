# LexBot

Assistant juridique IA intégré à Discord, propulsé par Mistral via Ollama. Répond aux questions de droit français en citant les textes de loi officiels (Code civil, Code pénal, Code de la route) grâce à un système RAG.

> "Vos droits, expliqués simplement."

---

## Fonctionnalités

- Réponses en **streaming** (affichage progressif dans Discord)
- **RAG** : recherche sémantique dans les codes de loi officiels (ChromaDB + HuggingFace)
- **Analyse de PDF** : upload d'un bail, contrat, CGV directement dans Discord
- **Sessions par utilisateur** : LexBot mémorise le contexte de la conversation
- **Modèle freemium** : 10 messages gratuits par utilisateur
- **100% local** : aucune donnée transmise à des serveurs tiers

---

## Prérequis

- [Node.js](https://nodejs.org/) v18+
- [Ollama](https://ollama.com/) installé et lancé
- [ChromaDB](https://www.trychroma.com/) lancé sur `localhost:8000`
- Les PDFs des codes de loi dans `law_texts/`

---

## Installation

**1. Cloner le repo**
```bash
git clone https://github.com/EpitechBachelorPromo2028/B-AIA-210-PAR-2-1-eliza-13
cd B-AIA-210-PAR-2-1-eliza-13/chatbot
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configurer le bot Discord**

Créer un fichier `.env` dans `chatbot/` :
```
TOKEN=ton_token_discord
```

**4. Installer Ollama et télécharger Mistral**
```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Télécharger le modèle (fait automatiquement au démarrage, ou manuellement)
ollama pull mistral
```

**5. Lancer ChromaDB**
```bash
pip install chromadb
chroma run --host localhost --port 8000
```

**6. Vérifier les PDFs**

S'assurer que `law_texts/` contient bien :
```
law_texts/
├── code-civil.pdf
├── code-penal.pdf
└── code-de-la-route.pdf
```

---

## Lancement

```bash
cd chatbot
npm start
```

Au démarrage, le bot :
1. Indexe les PDFs dans ChromaDB (première fois uniquement)
2. Vérifie qu'Ollama est actif (le démarre si nécessaire)
3. Télécharge le modèle Mistral si absent
4. Se connecte à Discord

Pour le développement (rechargement automatique) :
```bash
npm run dev
```

Pour mettre à jour les slash commands Discord :
```bash
npm run refresh
```

---

## Utilisation

Dans n'importe quel salon Discord où le bot est présent :

```
/chat prompt:Mon propriétaire refuse de rendre ma caution depuis 3 mois, que faire ?
```

```
/chat prompt:Analyse ce contrat  file:contrat.pdf
```

LexBot répond avec les articles de loi pertinents, en citant ses sources.

---

## Architecture

```
chatbot/
├── index.js          # Point d'entrée, init Ollama + Discord
├── lexbot.js         # Appel Ollama (streaming), gestion sessions
├── prompt.js         # Handler slash commands, embeds Discord
├── rag.js            # ChromaDB + embeddings HuggingFace
└── refresh_commands.js

law_texts/
├── code-civil.pdf
├── code-penal.pdf
└── code-de-la-route.pdf

landing/
├── index.html        # Landing page
├── style.css
└── script.js
```

---

## Stack technique

| Composant | Technologie |
|---|---|
| Bot Discord | discord.js v14 |
| Modèle LLM | Mistral 7B via Ollama |
| Embeddings | Xenova/multilingual-e5-small |
| Base vectorielle | ChromaDB |
| Parsing PDF | pdf-parse |

---

## Éthique & Limitations

LexBot est un outil d'information juridique, **pas un substitut à un avocat**. Les réponses sont ancrées dans les textes officiels via RAG, mais les codes de loi indexés correspondent à une version datée. Pour tout litige réel, consultez un professionnel.

Voir [RAPPORT.md](RAPPORT.md) pour l'analyse complète marketing et éthique.
