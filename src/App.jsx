import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { Box, Heading } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Box p={8}>
        <Heading textAlign="center" mb={6}>
          Nyhetssida
        </Heading>
        <Box 
          p={6} 
          borderWidth={1} 
          borderRadius="lg" 
          shadow="md"
          bg="white"
        >
          <Heading size="md" mb={3}>
            Test Artikel
          </Heading>
          <Box color="gray.600">
            Chackra fungerar!
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App