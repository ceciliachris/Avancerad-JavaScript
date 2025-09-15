import { useEffect, useState } from "react";
import axios from "axios";
import useArticleStore from "../../store/articleStore";

export const useArticle = (id) => {
  const [loading, setLoading] = useState(true);
  const { getArticleById } = useArticleStore();

  // Hämta från Zustand store först
  const { article: storeArticle, isLocal } = getArticleById(id);
  const [article, setArticle] = useState(storeArticle);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      
      // Om artikeln finns i store, använd den
      if (storeArticle) {
        setArticle(storeArticle);
        setLoading(false);
        return;
      }

      // Annars hämta från API
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        setArticle(response.data);
      } catch (error) {
        setArticle(null);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id, storeArticle]);

  return { article, isLocal, loading, setArticle };
};