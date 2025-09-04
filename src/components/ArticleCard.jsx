import { Box, Heading, Text, HStack, Badge, Button, VStack } from '@chakra-ui/react'

function ArticleCard({ article, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Är du säker på att du vill radera denna artikel?')) {
      onDelete(article.id)
    }
  }

  return (
    <Box
      w="100%"
      p={6}
      borderWidth={1}
      borderRadius="lg"
      shadow="md"
      bg="white"
      _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <VStack align="stretch" spacing={3}>
        <Heading size="md" color="gray.800">
          {article.title}
        </Heading>
        
        <Text color="gray.600" lineHeight="1.6">
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
          
          <HStack spacing={2}>
            <Badge colorScheme={article.isLocal ? "purple" : "blue"} variant="solid">
              {article.isLocal ? "Min artikel" : "API Artikel"}
            </Badge>
            
            {/* Visa radera-knapp bara för lokala artiklar */}
            {article.isLocal && (
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation() // Förhindra att kort-klick triggas
                  handleDelete()
                }}
              >
                🗑️ Radera
              </Button>
            )}
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ArticleCard