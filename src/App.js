// https://nomadcoders.co/react-for-beginners/lectures/3290
// full source here - https://github.com/nomadcoders/react-for-beginners

// gh-pages
// package.json
// add "homepage": "https://monsoonp.github.io/{repo}"
// for gh-pages add basename to BrowserRouter

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
