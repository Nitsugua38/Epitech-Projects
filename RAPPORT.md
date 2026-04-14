# LexBot — Marketing & Ethics Report
**ELIZA project — Epitech**
*"Your rights, explained simply."*

---

## 1. Marketing & Business strategy

LexBot is a legal assistant AI chatbot. Our goal is to make French laws and regulations accessible and easy to understand for everyone, while focusing on data privacy.



### 1.1. Target users

- Private individuals: they often have trouble finding and understanding relevant legal informations, and this usually leads to a lot of confusion.
- S.M.B / Start-ups: simple legal appointments often result in high costs that could be avoided.
- Legal advice organisations: they often have too many appointment requests for simple matters that could be resolved through automation.


### 1.2. Our chatbot objectives

- Vulgarize legal texts and make them accessible.
- Answer legal questions with a context tailored to the user.
- Automate the provision of legal informations.


<br>

#### 1.3.1. Value chain

**Scenario 1 - The traditional way:**

---
1. User searches on Google or Legifrance (too many info, hard to understand)
2. User goes through dozens of articles trying to find the relevant info (2+ hours)
3. User tries to understand if the law applies to his specific case (high chance of being wrong)
4. User takes action or decides to contact a lawyer (200€-500€ /hour in Paris)
5. User data are shared with third-parties or processed by US-based companies

=> The process is long, stressful and costy

---

**Scenario 2 - The LexBot way:**

---
1. User asks a question in his own terms on Discord (accessible)
2. LexBot instantly retrieves relevant info in his legal texts database
3. LexBot replies simply with references (<20 seconds)
4. User data is kept private and local

=> The process is super fast and much cheaper.

---


#### 1.3.2. Business impact

- Much faster response time since users no longer need appointments nor having to spend hours of research.
- Lower costs: free or premium tier (10€ /m) instead of 200€+ for an appointment or hiring a lawyer.
- Available 24/7 and accessible through Discord to target younger audiences.
- Confidential: data is processed locally in France.


<br>

### 1.4. Return on Investment

$ \text{Business ROI} = \frac{\text{Subscription Revenue} - \text{Ollama server cost}} {\text{Ollama server cost}} $

Key Performance Indicators:

- User engagement (measured by number of interactions per user)
- Customer Retention Rate (measured by number of returning users)
- Premium Conversion Rate (measured by number of users subscribing to the Pro version after reaching the 10 messages limit)
- LexBot Efficiency (measured through customer satisfaction)




<br><br>



---

## 2. Ethics considerations - (WIP)

### 2.1 LexBot ne remplace pas un avocat

**Risque identifié :** L'effet ELIZA — les utilisateurs peuvent faire une confiance excessive au chatbot et prendre des décisions juridiques importantes uniquement sur la base de ses réponses.

**Mesures implémentées :**
- Le system prompt de LexBot impose systématiquement de ne pas donner de conseil définitif
- Chaque réponse cite les articles de loi sources (vérifiables par l'utilisateur)
- Un disclaimer est affiché dans le footer des embeds Discord
- LexBot oriente vers des ressources officielles (ADIL, service-public.fr, Défenseur des droits) pour les cas complexes

---

### 2.2 Confidentialité et données personnelles

**Risque identifié :** Les utilisateurs partagent des situations personnelles et sensibles (licenciement, litige familial, dette) — une fuite de données serait gravement préjudiciable.

**Mesures implémentées :**
- **Aucune donnée n'est persistée** : les sessions sont stockées uniquement en mémoire vive (RAM) et disparaissent au redémarrage du bot
- **Aucun envoi vers un tiers** : Ollama et Mistral tournent 100% en local — les données ne quittent jamais la machine hôte
- **Aucune collecte d'identifiants** : seul l'ID Discord (anonymisé) est utilisé pour gérer les sessions, sans association à un nom réel

> Conformité RGPD naturelle : pas de traitement de données personnelles au sens strict, pas de base de données, pas de logs conservés.

---

### 2.3 Risque de désinformation juridique

**Risque identifié :** Le modèle Mistral peut générer des articles de loi incorrects ou des informations périmées (les textes législatifs évoluent).

**Mesures implémentées :**
- Le système RAG ancre les réponses dans les textes officiels indexés (Code civil, Code pénal, Code de la route)
- Le system prompt interdit à LexBot de citer un article s'il n'est pas dans les extraits RAG fournis
- LexBot précise explicitement quand une information pourrait nécessiter une vérification auprès d'un professionnel

**Limite reconnue :** Les PDFs indexés correspondent à une version datée des codes de loi. Des modifications législatives récentes pourraient ne pas être prises en compte. Un avertissement sur la date de la base documentaire est recommandé.

---

### 2.4 Biais algorithmiques

**Risque identifié :** Mistral, comme tout LLM, peut présenter des biais dans son interprétation du droit (favoriser certaines parties dans un litige, interpréter ambiguïment un article).

**Mesures implémentées :**
- Le system prompt positionne LexBot comme un outil neutre d'information, non comme un conseiller partisan
- LexBot est explicitement limité aux questions juridiques (refus des questions hors-sujet)
- Les réponses citent les sources pour permettre à l'utilisateur de vérifier et de se forger sa propre opinion

**Mesure recommandée :** Mettre en place un mécanisme de feedback utilisateur (réaction Discord ✅/❌) pour identifier les réponses problématiques et améliorer le système.

---

### 2.5 Risque de dépendance et d'effet ELIZA

**Risque identifié :** Des utilisateurs vulnérables (personnes en détresse suite à un litige) pourraient développer une dépendance émotionnelle à LexBot ou lui attribuer une empathie qu'il n'a pas.

**Mesures implémentées :**
- LexBot communique sur un registre professionnel et factuel, sans simuler d'empathie excessive
- Le nom "LexBot" et l'interface Discord rappellent clairement qu'il s'agit d'un outil automatisé
- La limite de 10 messages gratuits incite à solliciter une aide humaine pour les cas complexes

---

### 2.6 Tableau de synthèse éthique

| Risque | Niveau | Mesure en place |
|---|---|---|
| Conseil juridique erroné pris pour définitif | Élevé | Disclaimer systématique + citation de sources |
| Fuite de données personnelles | Faible | 100% local, pas de persistance |
| Désinformation par hallucination | Moyen | RAG ancré sur textes officiels |
| Biais en faveur d'une partie | Moyen | Neutralité imposée dans le prompt |
| Dépendance / Effet ELIZA | Faible-Moyen | Ton professionnel, limite freemium |
| Données périmées | Moyen | Avertissement sur la date des textes indexés |

---

## 3. Conclusion

LexBot répond à un besoin réel et massif : l'accès au droit reste inégal en France, freiné par le coût et la complexité des démarches. En s'appuyant sur une architecture IA locale (Ollama + Mistral), un système RAG ancré dans les textes officiels, et une interface accessible via Discord, LexBot démocratise l'accès à l'information juridique tout en respectant la confidentialité des utilisateurs.

Son modèle freemium offre une entrée gratuite à faible barrière et une monétisation naturelle pour les utilisateurs réguliers (PME, professionnels). Les considérations éthiques ont été intégrées dès la conception, avec une architecture qui minimise structurellement les risques liés aux données personnelles.

> **LexBot ne prétend pas remplacer un avocat. Il vise à s'assurer que personne ne renonce à ses droits par manque d'information.**
