import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Toaster } from "./components/ui/toaster"
import Home from "./pages/Home"

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Home />
      <Toaster />
    </ChakraProvider>
  )
}

export default App