import { useState, useEffect } from "react";
import { Container, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import NewArticleForm from "../components/NewArticleForm";
import { toaster } from "../components/ui/toaster"

function Home() {
  const [apiArticles, setApiArticles] = useState([])
  const [localArticles, setLocalArticles] = useState([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    fetchArticles()
    loadLocalArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/posts")
      setApiArticles(response.data.posts)
      setLoading(false)
    } catch (error) {
      console.error("Fel vid hämtning av artiklar:", error)
      setLoading(false)
    }
  }

  const loadLocalArticles = () => {
    const saved = localStorage.getItem("localArticles")
    if (saved) {
      setLocalArticles(JSON.parse(saved))
    }
  }

  const saveLocalArticles = (articles) => {
    localStorage.setItem("localArticles", JSON.stringify(articles))
  }

  const handleAddArticle = (newArticle) => {
    const updatedLocalArticles = [newArticle, ...localArticles]
    setLocalArticles(updatedLocalArticles)
    saveLocalArticles(updatedLocalArticles)
    
  }

   const handleDeleteArticle = (articleId) => {
    const articleToDelete = localArticles.find((a) => a.id === articleId)
    const updatedLocalArticles = localArticles.filter((a) => a.id !== articleId)
    setLocalArticles(updatedLocalArticles)
    saveLocalArticles(updatedLocalArticles)


    toaster.create({
      title: "Artikel raderad! 🗑️",
      description: `"${articleToDelete?.title}" har tagits bort`,
      type: "error",
      duration: 3000,
    })
  };

  const handleLikeArticle = (articleId) => {
    const updatedLocalArticles = localArticles.map((a) =>
      a.id === articleId ? { ...a, likes: (a.likes || 0) + 1 } : a
    )
    setLocalArticles(updatedLocalArticles)
    saveLocalArticles(updatedLocalArticles)
  }

  const handleDislikeArticle = (articleId) => {
    const updatedLocalArticles = localArticles.map((a) =>
      a.id === articleId ? { ...a, dislikes: (a.dislikes || 0) + 1 } : a
    )
    setLocalArticles(updatedLocalArticles)
    saveLocalArticles(updatedLocalArticles)
  }

  const allArticles = [...localArticles, ...apiArticles]

  if (loading) {
    return (
      <Container maxW="6xl" py={8}>
        <Heading>Laddar artiklar...</Heading>
      </Container>
    )
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
  )
}

export default Home