import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Suppliers from './pages/Suppliers';
import Startups from './pages/Startups';
import PostMaterial from './pages/PostMaterial';
import Requests from './pages/Requests';
import LoginSignup from './pages/LoginSignup';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen m-0">
        <Navbar />
        <main className="flex-grow container ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/post-material" element={<PostMaterial />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/login" element={<LoginSignup />} />
            {/* Add 404 route if you want */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
