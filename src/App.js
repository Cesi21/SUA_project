import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import LoginPage from './pages/LoginPage';
import SejePage from './pages/SejePage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage'; // Import the new component
import TicketPage from './pages/TicketPage';
import PaymentPage from './pages/PaymentPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/" element={<EventPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tickets" element={<TicketPage />} />
        <Route path="/seje" element={<SejePage/>} />
        <Route path="/placilo/:ticketID" element={<PaymentPage/>} />
        {/* Dodajte dodatne poti tukaj */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;