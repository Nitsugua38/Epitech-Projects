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

## 2. Ethics considerations

### 2.1 LexBot cannot fully replace a lawyer

**Identified risk:** The ELIZA effect — users can have excessive trust in the chatbot and take important legal decisions solely based on its responses.

**Implemented measures:**
- LexBot's system prompt always enforce not giving definitive advice.
- Every response includes references (that can be verified by the user).
- A disclaimer is displayed in the response embeds footer.
- LexBot redirects to official ressources (ADIL, service-public.fr, Défenseur des droits) for the most complex cases.



### 2.2 Confidentiality and personal data

**Identified risk:** Users could share personal and sensible informations (getting fired, family dispute, debt) — a data leak would be very detrimentful.

**Implemented measures:**
- **No persisting data**: sessions are saved in memory (RAM) only and disappear when the bot restarts.
- **No sharing with third-party**: Ollama and Mistral run fully locally — data never leave the host server
- **No identification data collected**: Only Discord IDs (anonymous) are used to manage sessions, not tied to real world names.

> GDPR compliant by nature: no personal data processing, no persisting database, no logs.


### 2.3 Risk of legal misinformation

**Identified risk:** The model could generate incorrect law articles or outdated info.

**Implemented measures:**
- The RAG system anchors answers in indexed official textbooks (Code civil, Code pénal, Code de la route).
- The system prompt forbids LexBot to cite an article if it's not from the RAG documents.
- LexBot explicitly says when an information could necessit further verification with a professionnal.

**Current limitation:** Indexed PDFs correspond to a specific version of legal texts. Recent modifications may not be taken into account.


### 2.4 Algorithmic bias

**Identified risk:** Mistral, like any LLM, may present bias in its interpretation of the law (support a certain party over another in a dispute, misunderstand an article).

**Implemented measures:**
- The system prompt places LexBot as a neutral information tool, not like a biased advisor.
- LexBot is explicitly limited to legal questions (strictly no off-topic).
- Answers cite their sources to allow the user to verify and make their own opinion.

**Recommended measure:** Implement a feedback mechanism (Discord reaction ✅/❌) to identify problematic issues and improve the system.


### 2.5 Addiction risk & ELIZA effect

**Identified risk:** Vulnerable users may develop an emotional dependency to LexBot or assign him an empathy he doesn't have.

**Implemented measures:**
- LexBot communicate on a professionnal and factual tone, without simulating excessive empathy.
- The "LexBot" name and the Discord interface are a clear reminder that it is an automated tool.
- The 10 free messages limit encourage users to get human help for the most complex cases.


### 2.6 Ethics Summary

| Risk | Level | In-place measure |
|---|---|---|
| Incorrect legal advice taken as final | High | Systematic Disclaimer + displaying sources |
| Personal data leak | Low | 100% local, no data persistence |
| Misonformation by hallucination | Medium | RAG anchored in official textbooks |
| Bias in favor of one party | Medium | Neutrality imposed by the prompt |
| Addiction / ELIZA effect | Low-Medium | Professionnal tone, freemium limit |
| Outdated data | Medium | Warning on the date of indexed data |

---

## 3. Conclusion

LexBot addresses a real and global need: access to justice remains unequal in France, slowed by the cost and complexity of legal procedures. Leveraging a local AI architecture (Ollama + Mistral), a legal information system grounded in official texts, and an interface accessible via Discord, LexBot democratizes access to legal information while respecting user privacy.

Its freemium model offers free entry with a low barrier to entry and natural monetization for regular users (SMBs, professionals). Ethical considerations were integrated from the outset, with an architecture that structurally minimizes risks related to personal data.

> **LexBot does not pretend remplacing a lawyer. It aims at assuring that no one renounces their rights because of a lack of information.**
