import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Navbar, Hero, Work, Capabilities, Contact } from "./components";
import Home from './components/Home'; // Assuming Home component is also in the components folder
import Desc from './components/Desc'; // Assuming Desc component is also in the components folder
import Works from './components/Works';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Works />} />
          <Route path="/work/workdes/:id" element={<Desc />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/capabilities" element={<Capabilities />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
