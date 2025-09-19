import { VStack, Text } from '@chakra-ui/react'
import ArticleCard from './ArticleCard'

function ArticleList({ articles, onDelete, onLike, onDislike }) {
  // Show message when no articles are available
  if (articles.length === 0) {
    return (
      <Text textAlign="center" color="gray.500" py={8}>
        Inga artiklar att visa. Skapa din första artikel ovan! ✍️
      </Text>
    )
  }

  return (
    <VStack spacing={4}>
      {articles.map((article) => (
        <ArticleCard 
          key={`${article.isLocal ? 'local' : 'api'}-${article.id}`}
          article={article}
          onDelete={onDelete}
          onLike={onLike}
          onDislike={onDislike}
        />
      ))}
    </VStack>
  )
}

export default ArticleList