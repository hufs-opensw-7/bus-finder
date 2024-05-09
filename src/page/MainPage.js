import ArrivingSoon from '../components/MainPage/ArrivingSoonCard';
import BusCard from '../components/MainPage/BusCard';
import GameCard from '../components/MainPage/GameCard';

function MainPage() {
  return (
    <>
      <ArrivingSoon />
      <BusCard />
      <div className="divider mt-8"></div>
      <GameCard />
    </>
  );
}

export default MainPage;