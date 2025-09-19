export class ArticleNormalizer {
  static normalize(article, isLocal = false) {
    return {
      id: article.id,
      title: article.title,
      body: article.body,
      likes: isLocal ? (article.likes || 0) : (article.reactions?.likes || 0),
      dislikes: isLocal ? (article.dislikes || 0) : (article.reactions?.dislikes || 0),
      isLocal,
      ...(isLocal ? {} : { reactions: article.reactions })
    }
  }

  
  static normalizeArray(articles, isLocal = false) {
    return articles.map(article => this.normalize(article, isLocal))
  }

   // Update likes/dislikes for a normalized article
   
  static updateReactions(article, type, increment = 1) {
    const updated = { ...article }
    updated[type] = (updated[type] || 0) + increment
    

    if (!article.isLocal && updated.reactions) {
      updated.reactions = {
        ...updated.reactions,
        [type]: updated[type]
      }
    }
    
    return updated
  }
}