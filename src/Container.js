import { Routes, Route } from "react-router-dom";

import MainPage from "./page/MainPage";
import DetailPage from "./page/DetailPage";
import { PlayingGame } from "../2048/PlayingGame";

function Container() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/detail/:busNumber" element={<DetailPage />}></Route>
      <Route path="/play" element={<PlayingGame />}></Route>
    </Routes>
  );
}

export default Container;
