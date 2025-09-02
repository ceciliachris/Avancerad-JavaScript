import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import Home from './pages/Home';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Home />
    </ChakraProvider>
  );
}

export default App;