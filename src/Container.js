import { Routes, Route } from "react-router-dom";

import MainPage from "./page/MainPage";
import DetailPage from "./page/DetailPage";

function Container() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/detail/:busNumber" element={<DetailPage />}></Route>
    </Routes>
  );
}

export default Container;
