// https://nomadcoders.co/react-for-beginners/lectures/3290
// full source here - https://github.com/nomadcoders/react-for-beginners

// gh-pages
// package.json
// add "homepage": "https://monsoonp.github.io/{repo}"
// for gh-pages add basename to BrowserRouter

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Detail from "./routes/Detail";
// FIXME: home 화면 추가 고려
// import Home from "./routes/Home";
import GlobalUpcoming from "./routes/GlobalUpcoming";
import WeeklyBoxoffice from "./routes/WeeklyBoxoffice";
import ReservationRank from "./routes/ReservationRank";
import OttRank from "./routes/OttRank";
import "bootstrap/dist/css/bootstrap.min.css";

// TODO: 각 페이지 로딩화면 조건 변경 -> 로딩화면 제거
// TODO: 전체 페이지 refactoring
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/reservation" element={<ReservationRank />} />
        <Route path="/boxoffice" element={<WeeklyBoxoffice />} />
        <Route path="/ott" element={<OttRank />} />
        <Route path="/globalupcoming" element={<GlobalUpcoming />} />
        {/* page not found / 404 page */}
        <Route path="/" element={<Navigate to="/reservation" />} />
      </Routes>
    </Router>
  );
}

export default App;
