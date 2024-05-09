import { BrowserRouter } from 'react-router-dom';
import Container from './Container';

import Header from './components/Header';
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="lg:container lg:mx-auto">
        <Header />
        <Container />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
