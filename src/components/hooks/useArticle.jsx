import { useEffect, useState } from "react";
import axios from "axios";

export const useArticle = (id) => {
  const [article, setArticle] = useState(null);
  const [isLocal, setIsLocal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      
      const saved = localStorage.getItem("localArticles");
      if (saved) {
        const localArticles = JSON.parse(saved);
        const foundLocal = localArticles.find((a) => String(a.id) === id);
        if (foundLocal) {
          setArticle(foundLocal);
          setIsLocal(true);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        setArticle(response.data);
        setIsLocal(false);
      } catch (error) {
        setArticle(null);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  return { article, isLocal, loading, setArticle };
};