import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home2 from "./pages/Home2"; // Adjust the path based on your project structure
import Settings from "./pages/Settings"; // Adjust the path for Settings page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
