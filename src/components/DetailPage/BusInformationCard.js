import { useEffect, useState } from "react";
import redBusImage from "../../assets/red_bus.png";
import blueBusImage from "../../assets/blue_bus.png";

function BusInformationCard({ busNumber, headingTo, schedule }) {
  const [timeToNextBus, setTimeToNextBus] = useState("");

  useEffect(() => {
    const calculateTimeToNextBus = () => {
      const now = new Date();
      const nowTime = `${now.getHours() < 10 ? "0" : ""}${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;

      const isWeekend = now.getDay() === 0 || now.getDay() === 6; // 0 = Sunday, 6 = Saturday
      const scheduleTimes = isWeekend ? schedule.weekend : schedule.weekday;

      const nextBusTime = scheduleTimes.find((time) => time >= nowTime);

      if (nextBusTime) {
        const nextBusHour = parseInt(nextBusTime.split(":")[0]);
        const nextBusMinute = parseInt(nextBusTime.split(":")[1]);
        const nextBusDateTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          nextBusHour,
          nextBusMinute
        );
        const timeDifference = nextBusDateTime - now;
        const timeToNextBusInMinutes = Math.round(timeDifference / 60000);

        if (timeToNextBusInMinutes <= 0) {
          setTimeToNextBus("잠시 후 도착 예정");
        } else {
          setTimeToNextBus(`${timeToNextBusInMinutes}분 뒤 도착 예정`);
        }
      } else {
        setTimeToNextBus("운행 종료");
      }
    };

    calculateTimeToNextBus();
    const interval = setInterval(calculateTimeToNextBus, 60000);

    return () => clearInterval(interval);
  }, [schedule]);

  const isShuttleBus = busNumber.includes("교내셔틀버스");
  const busImage = isShuttleBus ? blueBusImage : redBusImage;
  const headingText = isShuttleBus ? `${headingTo} 방면` : `한국외대 ⟷ ${headingTo}`;
  const timeTextColor = timeToNextBus === "운행 종료" ? "text-red-400" : "text-green-400";

  return (
    <div className="card bg-neutral my-4">
      <div className="card-body items-center text-center">
        <img src={busImage} className="w-24" />
        <h1 className="text-base lg:text-lg font-bold">{busNumber}</h1>
        <p className="text-sm lg:text-base">{headingText}</p>
        <p className={`${timeTextColor} text-xs lg:text-sm`}>{timeToNextBus}</p>
      </div>
    </div>
  );
}

export default BusInformationCard;
