import { create } from 'zustand'
import { ArticleNormalizer } from '../utils/ArticleNormalizer'

const useArticleStore = create((set, get) => ({
  articles: [],
  loading: false,
  
  setApiArticles: (articles) => {
    const normalizedArticles = ArticleNormalizer.normalizeArray(articles, false)
    set(state => ({
      articles: [
        ...state.articles.filter(a => a.isLocal), // Keep local articles
        ...normalizedArticles // Add normalized API articles
      ]
    }))
  },
  
  setLoading: (loading) => set({ loading }),
  
  addLocalArticle: (article) => {
    const normalizedArticle = ArticleNormalizer.normalize(article, true)
    set(state => ({ 
      articles: [normalizedArticle, ...state.articles] 
    }))
    // Centralized localStorage handling
    get()._saveLocalArticles()
  },
  
  deleteLocalArticle: (articleId) => {
    set(state => ({
      articles: state.articles.filter(a => !(a.id === articleId && a.isLocal))
    }))
    // Centralized localStorage handling
    get()._saveLocalArticles()
  },
  
  likeArticle: (articleId, isLocal) => {
    set(state => ({
      articles: state.articles.map(article => 
        article.id === articleId && article.isLocal === isLocal
          ? ArticleNormalizer.updateReactions(article, 'likes', 1)
          : article
      )
    }))
    
    // Save to localStorage only for local articles
    if (isLocal) {
      get()._saveLocalArticles()
    }
  },
  
  dislikeArticle: (articleId, isLocal) => {
    set(state => ({
      articles: state.articles.map(article => 
        article.id === articleId && article.isLocal === isLocal
          ? ArticleNormalizer.updateReactions(article, 'dislikes', 1)
          : article
      )
    }))
    
    // Save to localStorage only for local articles
    if (isLocal) {
      get()._saveLocalArticles()
    }
  },
  
  loadLocalArticles: () => {
    try {
      const saved = localStorage.getItem("localArticles")
      if (saved) {
        const localArticles = JSON.parse(saved)
        const normalizedArticles = ArticleNormalizer.normalizeArray(localArticles, true)
        set(state => ({
          articles: [
            ...normalizedArticles,
            ...state.articles.filter(a => !a.isLocal) // Keep API articles
          ]
        }))
      }
    } catch (error) {
      console.error('Error loading local articles:', error)
    }
  },
  
  // Method for saving local articles to localStorage
  _saveLocalArticles: () => {
    try {
      const { articles } = get()
      const localArticles = articles.filter(a => a.isLocal)
      localStorage.setItem("localArticles", JSON.stringify(localArticles))
    } catch (error) {
      console.error('Error saving local articles:', error)
    }
  },
  
  getAllArticles: () => {
    const { articles } = get()
    return articles
  },
  
  getLocalArticles: () => {
    const { articles } = get()
    return articles.filter(a => a.isLocal)
  },
  
  getApiArticles: () => {
    const { articles } = get()
    return articles.filter(a => !a.isLocal)
  },
  
  getArticleById: (id) => {
    const { articles } = get()
    const article = articles.find(a => String(a.id) === String(id))
    return article ? { article, isLocal: article.isLocal } : { article: null, isLocal: false }
  }
}))

export default useArticleStore