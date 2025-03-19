
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

// const App = () => {
//   return (
//     <Router>
//       <div className=" min-h-screen w-full by-white flex items-center justify-center">
//        <Routes>
//          <Route path="/" element={<Home />} />
//        </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CommentPage from "./pages/Comment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comment/:id" element={<CommentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
