// https://nomadcoders.co/react-for-beginners/lectures/3290
// full source here - https://github.com/nomadcoders/react-for-beginners

// gh-pages
// package.json
// add "homepage": "https://monsoonp.github.io/{repo}"
// for gh-pages add basename to BrowserRouter

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Domestic from "./routes/DomesticMovie";
import Reservation from "./routes/Reservation";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/boxoffice" element={<Domestic />} />
        <Route path="/globalupcoming" element={<Home />} />
        {/* page not found */}
        <Route path="/" element={<Navigate to="/reservation" />} />
      </Routes>
    </Router>
  );
}

export default App;
