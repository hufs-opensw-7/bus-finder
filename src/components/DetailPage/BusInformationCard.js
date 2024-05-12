import redBusImage from "../../assets/red_bus.png";

function BusInformationCard({ busNumber, headingTo }) {
  return (
    <div className="card bg-neutral my-4">
      <div className="card-body items-center text-center">
        <img src={redBusImage} alt="bus image" className="w-24" />
        <h1 className="text-base lg:text-lg font-bold">{busNumber}번</h1>
        <p className="text-sm lg:text-base">한국외대 ⟷ {headingTo}</p>
        <p className="text-green-400 text-xs lg:text-sm">15분 뒤 도착 예정</p>
      </div>
    </div>
  );
}

export default BusInformationCard;
