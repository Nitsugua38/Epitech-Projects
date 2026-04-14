# LexBot — Rapport Marketing & Éthique
**Projet ELIZA — Epitech**
*"Vos droits, expliqués simplement."*

---

## 1. Stratégie Marketing

### 1.1 Cibles identifiées

**Cible principale — Les particuliers en difficulté juridique**
Des millions de Français font face chaque année à des litiges courants : bailleur qui refuse de restituer la caution, licenciement abusif, produit défectueux. La plupart ne consultent jamais un avocat par peur du coût ou par manque d'information. LexBot s'adresse à ces personnes qui ont besoin d'une réponse claire, rapide et gratuite pour comprendre leurs droits et savoir comment réagir.

**Cible secondaire — Les TPE/PME sans service juridique**
Les petites entreprises (moins de 50 salariés) n'ont généralement pas de juriste en interne. Elles ont besoin d'aide pour rédiger ou vérifier leurs CGV, s'assurer de leur conformité RGPD, ou comprendre un contrat fournisseur. LexBot peut jouer le rôle d'un premier filtre juridique avant de solliciter un avocat.

---

### 1.2 Besoins identifiés

| Besoin | Particuliers | PME |
|---|---|---|
| Comprendre ses droits rapidement | ✅ | ✅ |
| Réduire les coûts d'accès au conseil juridique | ✅ | ✅ |
| Analyser un document (bail, contrat) | ✅ | ✅ |
| Vérifier la conformité de CGV / RGPD | ❌ | ✅ |
| Disponibilité 24h/24, sans rendez-vous | ✅ | ✅ |
| Confidentialité des échanges | ✅ | ✅ |

---

### 1.3 Objectifs du chatbot

| Objectif | Description |
|---|---|
| **Acquisition** | Attirer des utilisateurs via Discord (communautés de locataires, auto-entrepreneurs, étudiants en droit) |
| **Rétention** | Maintenir l'engagement avec le modèle freemium (10 messages gratuits, puis Pro) |
| **Automation** | Répondre automatiquement à 80% des questions juridiques courantes sans intervention humaine |
| **Communication** | Positionner LexBot comme une marque de confiance dans l'accès au droit |

---

### 1.4 Valeur ajoutée & Chaîne de valeur

```
Utilisateur pose une question juridique
        ↓
LexBot détecte le domaine (bail, travail, conso...)
        ↓
Le système RAG recherche dans les codes de loi français (Code civil, Code pénal...)
        ↓
Mistral génère une réponse personnalisée citant les articles pertinents
        ↓
L'utilisateur reçoit en quelques secondes une réponse claire avec références légales
        ↓
Valeur créée : compréhension des droits, décision éclairée, économie de temps et d'argent
```

**Avantage compétitif clé :** LexBot tourne 100% en local (Ollama + Mistral). Les échanges ne transitent par aucun serveur tiers. C'est un argument fort en matière de confidentialité, particulièrement pour des questions sensibles (licenciement, litiges personnels).

---

### 1.5 Indicateurs de Performance (KPIs)

| KPI | Définition | Objectif cible |
|---|---|---|
| **Taux de résolution** | % de questions auxquelles LexBot apporte une réponse pertinente | > 75% |
| **Temps de réponse moyen** | Délai entre la question et la réponse complète | < 30 secondes |
| **Sessions actives / jour** | Nombre d'utilisateurs uniques utilisant le bot | > 50 à J+30 |
| **Taux de conversion Freemium → Pro** | % d'utilisateurs dépassant la limite gratuite | > 10% |
| **Score de satisfaction** | Notation utilisateur post-conversation (1-5) | > 4/5 |
| **Documents PDF analysés / semaine** | Usage de la fonctionnalité RAG + PDF | > 20 |

---

### 1.6 Retour sur Investissement (ROI)

**Coût d'une consultation classique :**
- Avocat en cabinet : 150 à 300 € / heure
- Consultation téléphonique avec une association (ADIL, UFC-Que Choisir) : délai de plusieurs jours
- Juriste freelance : 80 à 150 € / heure

**Valeur générée par LexBot :**
- Réponse en < 30 secondes, disponible 24h/24
- 10 consultations gratuites par utilisateur
- Version Pro (illimitée) : valeur estimée à 10–20 € / mois vs 150–300 € pour une seule consultation

**Estimation ROI pour 100 utilisateurs actifs / mois :**

| Scénario | Sans LexBot | Avec LexBot | Économie |
|---|---|---|---|
| 100 questions à un avocat (1h chacune) | 15 000 € | 0 € (freemium) | **15 000 €** |
| 10 utilisateurs Pro à 15 €/mois | — | 150 € de revenus | ROI positif dès J+1 |

> Pour une PME, une seule analyse de CGV ou de contrat fournisseur évitée représente une économie de 300 à 500 €. LexBot se rentabilise après une seule utilisation professionnelle.

---

## 2. Considérations Éthiques

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
