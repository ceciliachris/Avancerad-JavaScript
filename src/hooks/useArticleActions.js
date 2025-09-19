import { useEffect } from "react";
import axios from "axios";
import { toaster } from "../components/ui/toaster";
import useArticleStore from "../store/articleStore";
import { MESSAGES, TOAST_CONFIG } from "../constants";

export const useArticleActions = () => {
  const {
    getAllArticles,
    getLocalArticles,
    setApiArticles,
    setLoading,
    addLocalArticle,
    deleteLocalArticle,
    likeArticle,
    dislikeArticle,
    loadLocalArticles,
    loading
  } = useArticleStore();

  useEffect(() => {
    fetchArticles();
    loadLocalArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      setApiArticles(response.data.posts);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toaster.create({
        title: "Fel",
        description: MESSAGES.ERRORS.LOAD_ARTICLES,
        type: "error",
        duration: TOAST_CONFIG.DURATION,
      });
    }
    setLoading(false);
  };

   // Add new local article with success toast

  const handleAddArticle = (newArticle) => {
    addLocalArticle(newArticle);
    
    // Success toast
    toaster.create({
      title: MESSAGES.SUCCESS.ARTICLE_CREATED,
      description: `"${newArticle.title}" har lagts till`,
      type: "success",
      duration: TOAST_CONFIG.DURATION,
    });
  };


   // Delete local article with success toast
   
  const handleDeleteArticle = (articleId) => {
    const localArticles = getLocalArticles();
    const articleToDelete = localArticles.find((a) => a.id === articleId);
    
    deleteLocalArticle(articleId);

    // Success toast with deleted article title
    toaster.create({
      title: MESSAGES.SUCCESS.ARTICLE_DELETED,
      description: `"${articleToDelete?.title}" har tagits bort`,
      type: "error",
      duration: TOAST_CONFIG.DURATION,
    });
  };

  const handleLikeArticle = (articleId, isLocal) => {
    likeArticle(articleId, isLocal);
  };

  const handleDislikeArticle = (articleId, isLocal) => {
    dislikeArticle(articleId, isLocal);
  };

  return {
    articles: getAllArticles(),
    loading,
    handleAddArticle,
    handleDeleteArticle,
    handleLikeArticle,
    handleDislikeArticle,
    refetchArticles: fetchArticles
  };
};