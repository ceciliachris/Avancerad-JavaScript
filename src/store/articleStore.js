import { create } from 'zustand'

const useArticleStore = create((set, get) => ({
  apiArticles: [],
  localArticles: [],
  loading: false,
  
  setApiArticles: (articles) => set({ apiArticles: articles }),
  
  setLocalArticles: (articles) => set({ localArticles: articles }),
  
  setLoading: (loading) => set({ loading }),
  
  addLocalArticle: (article) => {
    const { localArticles } = get()
    const newLocalArticles = [article, ...localArticles]
    set({ localArticles: newLocalArticles })
    localStorage.setItem("localArticles", JSON.stringify(newLocalArticles))
  },
  
  deleteLocalArticle: (articleId) => {
    const { localArticles } = get()
    const updatedLocalArticles = localArticles.filter((a) => a.id !== articleId)
    set({ localArticles: updatedLocalArticles })
    localStorage.setItem("localArticles", JSON.stringify(updatedLocalArticles))
  },
  
  likeArticle: (articleId, isLocal) => {
    if (isLocal) {
      const { localArticles } = get()
      const updatedLocal = localArticles.map((a) =>
        a.id === articleId ? { ...a, likes: (a.likes || 0) + 1 } : a
      )
      set({ localArticles: updatedLocal })
      localStorage.setItem("localArticles", JSON.stringify(updatedLocal))
    } else {
      const { apiArticles } = get()
      const updatedApi = apiArticles.map((a) =>
        a.id === articleId
          ? { ...a, reactions: { ...a.reactions, likes: (a.reactions?.likes || 0) + 1 } }
          : a
      )
      set({ apiArticles: updatedApi })
    }
  },
  
  dislikeArticle: (articleId, isLocal) => {
    if (isLocal) {
      const { localArticles } = get()
      const updatedLocal = localArticles.map((a) =>
        a.id === articleId ? { ...a, dislikes: (a.dislikes || 0) + 1 } : a
      )
      set({ localArticles: updatedLocal })
      localStorage.setItem("localArticles", JSON.stringify(updatedLocal))
    } else {
      const { apiArticles } = get()
      const updatedApi = apiArticles.map((a) =>
        a.id === articleId
          ? { ...a, reactions: { ...a.reactions, dislikes: (a.reactions?.dislikes || 0) + 1 } }
          : a
      )
      set({ apiArticles: updatedApi })
    }
  },
  
  loadLocalArticles: () => {
    const saved = localStorage.getItem("localArticles")
    if (saved) {
      set({ localArticles: JSON.parse(saved) })
    }
  },
  
  getAllArticles: () => {
    const { localArticles, apiArticles } = get()
    return [...localArticles, ...apiArticles]
  },
  
  getArticleById: (id) => {
    const { localArticles, apiArticles } = get()
    const localArticle = localArticles.find((a) => String(a.id) === String(id))
    if (localArticle) return { article: localArticle, isLocal: true }
    
    const apiArticle = apiArticles.find((a) => String(a.id) === String(id))
    if (apiArticle) return { article: apiArticle, isLocal: false }
    
    return { article: null, isLocal: false }
  }
}))

export default useArticleStore