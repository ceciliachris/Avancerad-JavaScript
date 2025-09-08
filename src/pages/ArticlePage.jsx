import { useParams, useNavigate } from "react-router-dom";
import { Container, Heading, Text, HStack, Button, VStack, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("localArticles");
    if (saved) {
      const localArticles = JSON.parse(saved);
      const foundLocal = localArticles.find((a) => String(a.id) === id);
      if (foundLocal) {
        setArticle(foundLocal);
        return;
      }
    }

    axios.get(`https://dummyjson.com/posts/${id}`)
      .then((res) => setArticle(res.data))
      .catch(() => setArticle(null));
  }, [id]);

  if (!article) {
    return (
      <Container py={8}>
        <Heading>Artikeln hittades inte</Heading>
        <Button mt={4} onClick={() => navigate("/")}>
          Tillbaka hem
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack align="stretch" spacing={6}>
        <Heading color="blue.600">{article.title}</Heading>
        <Text>{article.body}</Text>

        <HStack spacing={4}>
          <Badge colorScheme="green">👍 {article.reactions?.likes || 0}</Badge>
          <Badge colorScheme="red">👎 {article.reactions?.dislikes || 0}</Badge>
        </HStack>

        <Button onClick={() => navigate("/")}>⬅️ Tillbaka</Button>
      </VStack>
    </Container>
  );
}

export default ArticlePage;