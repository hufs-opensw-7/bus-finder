import { BrowserRouter } from "react-router-dom";
import Container from "./Container";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="lg:container lg:mx-auto h-[100vh] flex flex-col justify-between">
        <Header />
        <Container />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
