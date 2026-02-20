import Starfield from "./components/Starfield";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import About from "./pages/About";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <BrowserRouter>
      <Analytics/>
      <Navbar />
      <Starfield />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
