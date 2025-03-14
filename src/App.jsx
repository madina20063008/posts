

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div className=" min-h-screen w-full by-white flex items-center justify-center">
       <Routes>
         <Route path="/" element={<Home />} />
       </Routes>
      </div>
    </Router>
  );
};

export default App;


