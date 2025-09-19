import { useParams, useNavigate } from "react-router-dom";
import { Container, HStack, Button, VStack, Badge, Spinner, Text } from "@chakra-ui/react";
import { useArticle } from "../hooks/useArticle";
import useArticleStore from "../store/articleStore";
import ArticleContent from "../components/ArticleContent";
import LikeDislikeButtons from "../components/LikeDisLikeButtons";
import { MESSAGES, UI_LABELS } from "../constants";

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { article, isLocal, loading } = useArticle(id);
  const { likeArticle, dislikeArticle } = useArticleStore();

  const handleLike = () => {
    likeArticle(parseInt(id), isLocal);
  };

  const handleDislike = () => {
    dislikeArticle(parseInt(id), isLocal);
  };

  if (loading) {
    return (
      <Container py={8} textAlign="center">
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>{MESSAGES.ERRORS.LOADING_ARTICLE}</Text>
      </Container>
    );
  }

  // Article not found
  if (!article) {
    return (
      <Container py={8} textAlign="center">
        <Text fontSize="xl" mb={4}>{MESSAGES.ERRORS.ARTICLE_NOT_FOUND}</Text>
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
            {isLocal ? UI_LABELS.LOCAL_ARTICLE : UI_LABELS.API_ARTICLE}
          </Badge>
        </HStack>

        <Button onClick={() => navigate("/")} size="lg" variant="outline">
          {MESSAGES.NAVIGATION.BACK_TO_HOME}
        </Button>
      </VStack>
    </Container>
  );
}

export default ArticlePage;