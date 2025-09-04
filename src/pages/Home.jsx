import { useState, useEffect } from "react";
import { Container, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import NewArticleForm from "../components/NewArticleForm";

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
    
    // TODO: Visa toast-meddelande här senare
    alert("Artikel skapad!")
  }

  const handleDeleteArticle = (articleId) => {
    const updatedLocalArticles = localArticles.filter(article => article.id !== articleId)
    setLocalArticles(updatedLocalArticles)
    saveLocalArticles(updatedLocalArticles)

        alert("Artikel raderad!")

  }

  // Kombinera alla artiklar (lokala först, sedan API)
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
          />
        ))}
      </VStack>
    </Container>
  )
}

export default Home