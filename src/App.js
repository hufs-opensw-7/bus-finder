import Header from './components/Header';
import BusCard from './components/BusCard';
import GameCard from './components/GameCard';

function App() {
  return (
    <div className="lg:container lg:mx-auto">
      <Header />

      <div role="alert" className="alert shadow-lg my-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 className="font-bold text-lg">잠시 후 도착 버스</h3>
          <div className="text-lg">1117번 1303번</div>
        </div>
      </div>

      <BusCard />
      <GameCard />
    </div>
  );
}

export default App;
