import { useParams, useNavigate } from "react-router-dom";
import { Container, HStack, Button, VStack, Badge, Spinner, Text } from "@chakra-ui/react";
import { useArticle } from "../components/hooks/useArticle";
import { updateLocalArticleLikes } from "../utils/articleUtils";
import ArticleContent from "../components/ArticleContent";
import LikeDislikeButtons from "../components/LikeDisLikeButtons";

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { article, isLocal, loading, setArticle } = useArticle(id);

  const handleLike = () => {
    if (isLocal) {
      const updatedArticle = updateLocalArticleLikes(id, true);
      if (updatedArticle) {
        setArticle(updatedArticle);
      }
    } else {
      setArticle(prev => ({
        ...prev,
        reactions: {
          ...prev.reactions,
          likes: (prev.reactions?.likes || 0) + 1
        }
      }));
    }
  };

  const handleDislike = () => {
    if (isLocal) {
      const updatedArticle = updateLocalArticleLikes(id, false);
      if (updatedArticle) {
        setArticle(updatedArticle);
      }
    } else {
      setArticle(prev => ({
        ...prev,
        reactions: {
          ...prev.reactions,
          dislikes: (prev.reactions?.dislikes || 0) + 1
        }
      }));
    }
  };

  if (loading) {
    return (
      <Container py={8} textAlign="center">
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Laddar artikel...</Text>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container py={8} textAlign="center">
        <Text fontSize="xl" mb={4}>Artikeln hittades inte</Text>
        <Button onClick={() => navigate("/")}>
          Tillbaka hem
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8}>
        <ArticleContent article={article} />
        
        <LikeDislikeButtons 
          article={article} 
          isLocal={isLocal}
          onLike={handleLike}
          onDislike={handleDislike}
        />

        <HStack justify="center">
          <Badge colorPalette={isLocal ? "purple" : "blue"} variant="solid" size="lg">
            {isLocal ? "Min artikel" : "API Artikel"}
          </Badge>
        </HStack>

        <Button onClick={() => navigate("/")} size="lg" variant="outline">
          ⬅️ Tillbaka till startsidan
        </Button>
      </VStack>
    </Container>
  );
}

export default ArticlePage;