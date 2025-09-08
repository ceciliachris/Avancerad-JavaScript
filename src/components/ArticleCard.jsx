import { Box, Heading, Text, HStack, Badge, Button, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function ArticleCard({ article, onDelete, onLike, onDislike }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm("Är du säker på att du vill radera denna artikel?")) {
            onDelete(article.id)
        }
    };

    const handleNavigate = () => {
        navigate(`/article/${article.id}`)
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
            onClick={handleNavigate}
        >
            <VStack align="stretch" spacing={3}>
                <Heading size="md" color="gray.800">
                    {article.title}
                </Heading>

                <Text color="gray.600" lineHeight="1.6" noOfLines={2}>
                    {article.body}
                </Text>

                <HStack justify="space-between" align="center">
                    <HStack spacing={3}>
                        <Button
                            size="sm"
                            colorPalette="green"
                            variant="subtle"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (article.isLocal) {
                                    onLike?.(article.id);
                                }
                            }}
                        >
                            👍 {article.likes ?? article.reactions?.likes ?? 0}
                        </Button>

                        <Button
                            size="sm"
                            colorPalette="red"
                            variant="subtle"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (article.isLocal) {
                                    onDislike?.(article.id);
                                }
                            }}
                        >
                            👎 {article.dislikes ?? article.reactions?.dislikes ?? 0}
                        </Button>
                    </HStack>

                    <HStack spacing={2}>
                        <Badge colorPalette={article.isLocal ? "purple" : "blue"} variant="solid">
                            {article.isLocal ? "Min artikel" : "API Artikel"}
                        </Badge>

                        {article.isLocal && (
                            <Button
                                size="sm"
                                colorPalette="red"
                                variant="solid"
                                onClick={(e) => {
                                    e.stopPropagation()
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