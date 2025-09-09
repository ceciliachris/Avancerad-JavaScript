import { Heading, Text, VStack } from "@chakra-ui/react";

function ArticleContent({ article }) {
  return (
    <VStack align="stretch" spacing={4}>
      <Heading color="blue.600" size="xl">
        {article.title}
      </Heading>
      <Text fontSize="lg" lineHeight="1.8" color="gray.700">
        {article.body}
      </Text>
    </VStack>
  );
}

export default ArticleContent;