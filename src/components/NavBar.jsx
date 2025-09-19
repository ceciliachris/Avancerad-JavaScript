import { Box, Container, Heading, HStack } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { UI_LABELS, MESSAGES } from '../constants'

function Navbar() {
  const location = useLocation()
  
  return (
    <Box bg="blue.600" color="white" py={4} shadow="md">
      <Container maxW="6xl">
        <HStack justify="space-between" align="center">
          <Link to="/">
            <Heading size="lg" cursor="pointer" _hover={{ color: "blue.200" }}>
              {UI_LABELS.SITE_TITLE}
            </Heading>
          </Link>
          
          <HStack spacing={6}>
            <Link to="/">
              <Box
                px={3}
                py={2}
                rounded="md"
                bg={location.pathname === '/' ? 'blue.700' : 'transparent'}
                _hover={{ bg: 'blue.700' }}
                cursor="pointer"
                fontWeight="medium"
              >
                {MESSAGES.NAVIGATION.HOME}
              </Box>
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

export default Navbar