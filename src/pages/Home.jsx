import { useState, useEffect } from "react";
import { Container, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import NewArticleForm from "../components/NewArticleForm";
import { toaster } from "../components/ui/toaster";
import useArticleStore from "../store/articleStore";

function Home() {
  const {
    apiArticles,
    localArticles,
    loading,
    setApiArticles,
    setLoading,
    addLocalArticle,
    deleteLocalArticle,
    likeArticle,
    dislikeArticle,
    loadLocalArticles,
    getAllArticles
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
      setLoading(false);
    } catch (error) {
      console.error("Fel vid hämtning av artiklar:", error);
      setLoading(false);
    }
  };

  const handleAddArticle = (newArticle) => {
    addLocalArticle(newArticle);
  };

  const handleDeleteArticle = (articleId) => {
    const articleToDelete = localArticles.find((a) => a.id === articleId);
    deleteLocalArticle(articleId);

    toaster.create({
      title: "Artikel raderad! 🗑️",
      description: `"${articleToDelete?.title}" har tagits bort`,
      type: "error",
      duration: 3000,
    });
  };

  const handleLikeArticle = (articleId, isLocal) => {
    likeArticle(articleId, isLocal);
  };

  const handleDislikeArticle = (articleId, isLocal) => {
    dislikeArticle(articleId, isLocal);
  };

  const allArticles = getAllArticles();

  if (loading) {
    return (
      <Container maxW="6xl" py={8}>
        <Heading>Laddar artiklar...</Heading>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={6} textAlign="center" color="blue.600">
        📰 Nyhetssida
      </Heading>
      
      <NewArticleForm onAddArticle={handleAddArticle} />
      
      <VStack spacing={4}>
        {allArticles.map((article) => (
          <ArticleCard 
            key={`${article.isLocal ? 'local' : 'api'}-${article.id}`}
            article={article}
            onDelete={handleDeleteArticle}
            onLike={handleLikeArticle}
            onDislike={handleDislikeArticle}
          />
        ))}
      </VStack>
    </Container>
  );
}

export default Home;