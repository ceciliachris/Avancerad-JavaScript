import { HStack, Button } from "@chakra-ui/react";

function LikeDislikeButtons({ article, isLocal, onLike, onDislike }) {
  const likes = isLocal ? (article.likes || 0) : (article.reactions?.likes || 0);
  const dislikes = isLocal ? (article.dislikes || 0) : (article.reactions?.dislikes || 0);

  return (
    <HStack justify="center" spacing={4}>
      <Button
        colorPalette="green"
        variant="solid"
        onClick={onLike}
        size="lg"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.2s"
      >
        👍 {likes}
      </Button>
      
      <Button
        colorPalette="red"
        variant="solid"
        onClick={onDislike}
        size="lg"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.2s"
      >
        👎 {dislikes}
      </Button>
    </HStack>
  );
}

export default LikeDislikeButtons;