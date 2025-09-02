import { Box, Heading, Text, HStack, Badge } from "@chakra-ui/react";

function ArticleCard({ article}) {
    return (
        <Box
        w="100%"
        p={6}
        borderWidth={1}
        borderRadius="lg"
        shadow="md"
        bg="white"
        _hover={{shadow: "lg" }}
        cursor="pointer"
        >

            <Heading size="md" mb={3}>
                {article.title}
            </Heading>

            <Text mb={4} color="gray.600">
                {article.body}
            </Text>

            <HStack justify="space-between">
                <HStack spacing={3}>
                    <Badge colorScheme="blue">
                        👍 {article.reactions?.likes || 0}
                    </Badge>
                    <Badge colorScheme="red">
            👎 {article.reactions?.dislikes || 0}
          </Badge>
                </HStack>

                <Badge colorScheme="green">
                    API Artikel
                </Badge>
            </HStack>
        </Box>
    )
}

export default ArticleCard