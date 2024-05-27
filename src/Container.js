import { Routes, Route } from "react-router-dom";

import MainPage from "./page/MainPage";
import DetailPage from "./page/DetailPage";
import Game2048Page from "./page/Game2048Page";

function Container() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/detail/:busNumber" element={<DetailPage />}></Route>
      <Route path="/play" element={<Game2048Page />}></Route>
    </Routes>
  );
}

export default Container;
