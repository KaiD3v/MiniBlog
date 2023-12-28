// CSS
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

//pages
import About from "./pages/About/About";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
