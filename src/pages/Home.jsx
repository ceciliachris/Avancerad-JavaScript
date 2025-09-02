import { useState, useEffect } from "react";
import { Container, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";

function Home() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => { 
        try {
            const response = await axios.get("https://dummyjson.com/posts")
            setArticles(response.data.posts)
            setLoading(false)
        } catch (error) {
            console.error("Fel vid hämtning av artiklar: ", error)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <Container maxW="6xl" py={8}>
                <Heading>Laddar artiklar...</Heading>
            </Container>
        );
    }

    return (
        <Container maxW="6xl" py={8}>
            <Heading mb={6} textAlign="center">
            Nyhetssida
            </Heading>

            <VStack spacing={4}>
                {articles.map((article) => (
                    <ArticleCard
                    key={article.id}
                    article={article}
                    />
                ))}
            </VStack>
        </Container>
    )
}

export default Home