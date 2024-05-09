import Header from '../components/Header';
import ArrivingSoon from '../components/ArrivingSoonCard';
import BusCard from '../components/BusCard';
import GameCard from '../components/GameCard';
import Footer from '../components/Footer'

function MainPage() {
  return (
    <div className="lg:container lg:mx-auto">
      <Header />
      <ArrivingSoon />
      <BusCard />

      <div className="divider mt-8"></div>
      
      <GameCard />
      <Footer />
    </div>
  );
}

export default MainPage;