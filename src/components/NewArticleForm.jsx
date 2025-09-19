import { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Heading, Text } from "@chakra-ui/react";
import { toaster } from "./ui/toaster"
import { MESSAGES, UI_LABELS, TOAST_CONFIG } from "../constants"
 
function NewArticleForm({ onAddArticle }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Form validation - only show error toast here
    if (!title.trim() || !body.trim()) {
      toaster.create({
        title: "Fel",
        description: MESSAGES.ERRORS.FORM_VALIDATION,
        type: "error",
        duration: TOAST_CONFIG.DURATION,
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

    // Let parent handle the toast notification for success
    onAddArticle(newArticle)
    
    // Reset form
    setTitle('')
    setBody('')
    setIsSubmitting(false)

    // NO SUCCESS TOAST HERE - parent component handles it
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
        {UI_LABELS.CREATE_ARTICLE}
      </Heading>
      
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Box w="100%">
            <Text mb={2} fontWeight="bold">{UI_LABELS.TITLE_REQUIRED}</Text>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={MESSAGES.PLACEHOLDERS.ARTICLE_TITLE}
              bg="white"
              required
            />
          </Box>

          <Box w="100%">
            <Text mb={2} fontWeight="bold">{UI_LABELS.CONTENT_REQUIRED}</Text>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={MESSAGES.PLACEHOLDERS.ARTICLE_BODY}
              minH="120px"
              bg="white"
              required
            />
          </Box>

          <Button
            type="submit"
            colorPalette="blue"
            isLoading={isSubmitting}
            loadingText={MESSAGES.LOADING.CREATING_ARTICLE}
            size="lg"
          >
            {UI_LABELS.CREATE_BUTTON}
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}

export default NewArticleForm