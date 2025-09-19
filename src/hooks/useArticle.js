import { useEffect, useState } from "react";
import axios from "axios";
import useArticleStore from "../store/articleStore";

export const useArticle = (id) => {
  const [loading, setLoading] = useState(true);
  const { getArticleById } = useArticleStore();

  // Get article from Zustand store first
  const { article: storeArticle, isLocal } = getArticleById(id);
  const [article, setArticle] = useState(storeArticle);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      
      // If article exists in store, use it
      if (storeArticle) {
        setArticle(storeArticle);
        setLoading(false);
        return;
      }

      // Otherwise fetch from API
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(null);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id, storeArticle]);

  return { article, isLocal, loading, setArticle };
};