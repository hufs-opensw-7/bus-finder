import Header from './components/Header';
import Footer from './components/Footer'

import MainPage from "./page/MainPage";
import DetailPage from './page/DetailPage';

function App() {
  return (
    <div className="lg:container lg:mx-auto">
      <Header />
      <DetailPage />
      <Footer />
    </div>
  );
}

export default App;
