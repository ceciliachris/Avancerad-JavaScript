import { Box, Heading, Text, HStack, Badge } from "@chakra-ui/react";

function ArticleCard({ article }) {
  return (
    <Box 
      w="100%" 
      shadow="md" 
      p={6}
      borderWidth={1}
      borderRadius="lg"
      _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <Heading size="md" mb={3} color="gray.800">
        {article.title}
      </Heading>
      
      <Text mb={4} color="gray.600" lineHeight="1.6">
        {article.body}
      </Text>
      
      <HStack justify="space-between" align="center">
        <HStack spacing={3}>
          <Badge colorScheme="green" variant="subtle">
            👍 {article.reactions?.likes || 0}
          </Badge>
          <Badge colorScheme="red" variant="subtle">
            👎 {article.reactions?.dislikes || 0}
          </Badge>
        </HStack>
        
        <Badge colorScheme="blue" variant="solid">
          API Artikel
        </Badge>
      </HStack>
    </Box>
  )
}

export default ArticleCard;