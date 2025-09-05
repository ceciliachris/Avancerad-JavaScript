import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/NavBar";   // 👈 importera här
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Navbar />  {/* 👈 Lägg till här */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
        <Toaster />
      </Router>
    </ChakraProvider>
  );
}

export default App;