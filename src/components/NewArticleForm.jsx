import { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Heading, Text } from "@chakra-ui/react";
import { toaster } from "./ui/toaster"
 
function NewArticleForm({ onAddArticle }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !body.trim()) {
      toaster.create({
        title:"Fel",
        description:"Både titel och innehåll måste fyllas i",
        type:"error",
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)

    const newArticle = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
      reactions: {
        likes: 0,
        dislikes: 0
      },
      isLocal: true
    }

    onAddArticle(newArticle)
    setTitle('')
    setBody('')
    setIsSubmitting(false)

    toaster.create({
        title: "Artikel skapad!",
        description: `"${newArticle.title}" har lagts till`,
      type: "success",
      duration: 3000,
    })
  }

  return (
    <Box 
      mb={8} 
      p={6}
      bg="blue.50" 
      borderWidth={1}
      borderColor="blue.200"
      borderRadius="lg"
    >
      <Heading size="md" mb={4} color="blue.700">
        ✍️ Skapa ny artikel
      </Heading>
      
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Box w="100%">
            <Text mb={2} fontWeight="bold">Titel *</Text>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Skriv en titel för din artikel..."
              bg="white"
              required
            />
          </Box>

          <Box w="100%">
            <Text mb={2} fontWeight="bold">Innehåll *</Text>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Skriv artikelns innehåll..."
              minH="120px"
              bg="white"
              required
            />
          </Box>

          <Button
            type="submit"
            colorPalette="blue"
            isLoading={isSubmitting}
            loadingText="Skapar artikel..."
            size="lg"
          >
            Skapa artikel
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}

export default NewArticleForm