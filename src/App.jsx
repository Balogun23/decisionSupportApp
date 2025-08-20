import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/App.css'; // Link to CSS file

const App = () => {
  return (
    <div className="app-container">
      <Header />
      
<main className="app-main">
  <div className="app-main-inner">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>
</main>

      <Footer />
    </div>
  );
};

export default App;
