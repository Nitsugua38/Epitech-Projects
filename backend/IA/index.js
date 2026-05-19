const tokenize = text =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9àâäéèêëîïôöùûüçœæ\s]/gi, " ")
    .split(/\s+/)
    .filter(Boolean);

const buildTermFrequency = tokens =>
  tokens.reduce((freq, word) => {
    freq[word] = (freq[word] || 0) + 1;
    return freq;
  }, {});

module.exports = {
  getRecommendations: async (userProfileText, offers) => {
    const userTokens = tokenize(userProfileText);
    const userFreq = buildTermFrequency(userTokens);
    const userTerms = new Set(userTokens);

    const scored = offers
      .map(offer => {
        const title = offer.title || "";
        const description = offer.descriptionPreview || offer.description || "";
        const tags = (offer.tags || []).join(" ");
        const skills = (offer.skills || []).join(" ");
        const content = `${title} ${description} ${tags} ${skills}`;
        const contentTokens = tokenize(content);
        const contentFreq = buildTermFrequency(contentTokens);

        let relevanceScore = 0;
        userTerms.forEach(term => {
          relevanceScore += (contentFreq[term] || 0) * userFreq[term];
        });

        return {
          ...offer,
          relevanceScore,
        };
      })
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5);

    return scored;
  },
};