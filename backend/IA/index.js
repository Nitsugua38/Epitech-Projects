const natural = require('natural');

module.exports = {
  getRecommendations: async (userProfileText, offers) => {
    const tfidf = new natural.TfIdf();
    const results = [];

    offers.forEach(offer => {
      const title = offer.title || "";
      const description = offer.description || "";
      const content = `${title} ${description}`;
      
      tfidf.addDocument(content);
    });

    tfidf.tfidfs(userProfileText, (i, score) => {
      results.push({
        ...offers[i],
        relevanceScore: score
      });
    });

    return results
      .filter(item => item.relevanceScore > 0) 
      .sort((a, b) => b.relevanceScore - a.relevanceScore) 
      .slice(0, 5); 
  }
};