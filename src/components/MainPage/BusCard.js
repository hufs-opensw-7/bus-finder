import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api.json";
import redBusImage from "../../assets/red_bus.png";
import blueBusImage from "../../assets/blue_bus.png";

function BusCard() {
  const [timeToNextBuses, setTimeToNextBuses] = useState({});

  const isWeekend = () => {
    const currentDate = new Date();
    return currentDate.getDay() === 0 || currentDate.getDay() === 6;
  };

  useEffect(() => {
    const findTimeToNextBuses = () => {
      const now = new Date();
      const nowTime = `${now.getHours() < 10 ? "0" : ""}${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
      const weekend = isWeekend();
      const nextBuses = {};

      api.forEach((item) => {
        if (!item.schedule) {
          console.error(`No schedule found for bus number ${item.bus_number}`);
          return;
        }

        const schedule = weekend ? item.schedule.weekend : item.schedule.weekday;

        if (!Array.isArray(schedule)) {
          console.error(`Schedule is not an array for bus number ${item.bus_number}`, schedule);
          return;
        }

        const currentTimeIndex = schedule.findIndex((time) => time >= nowTime);

        if (currentTimeIndex !== -1) {
          const nextBusTime = schedule[currentTimeIndex];
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
          const timeToNextBusInMinutes = Math.round(timeDifference / 60000); // Convert milliseconds to minutes

          if (timeToNextBusInMinutes <= 2) {
            nextBuses[item.bus_number] = "곧 도착";
          } else if (timeToNextBusInMinutes > 120) {
            nextBuses[item.bus_number] = "운행종료";
          } else {
            nextBuses[item.bus_number] = timeToNextBusInMinutes;
          }
        } else {
          const firstBusTomorrow = schedule[0];
          if (!firstBusTomorrow) {
            console.error(`No first bus found for bus number ${item.bus_number}`);
            nextBuses[item.bus_number] = "운행종료";
            return;
          }
          const firstBusHour = parseInt(firstBusTomorrow.split(":")[0]);
          const firstBusMinute = parseInt(firstBusTomorrow.split(":")[1]);
          const firstBusDateTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            firstBusHour,
            firstBusMinute
          );
          const timeDifference = firstBusDateTime - now;
          const timeToNextBusInMinutes = Math.round(timeDifference / 60000); // Convert milliseconds to minutes

          if (timeToNextBusInMinutes > 120) {
            nextBuses[item.bus_number] = "운행종료";
          } else {
            nextBuses[item.bus_number] = timeToNextBusInMinutes;
          }
        }
      });

      setTimeToNextBuses(nextBuses);
    };

    const interval = setInterval(findTimeToNextBuses, 60000);
    findTimeToNextBuses();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {Object.keys(timeToNextBuses).map((busNumber) => (
        <Link to={`/detail/${busNumber}`} key={busNumber}>
          <div className="card card-side bg-base-100 shadow-xl my-4 hover:bg-base-200">
            <figure className="max-w-20 lg:max-w-24 ml-3.5 -mr-4">
              <img
                src={
                  busNumber.includes("교내셔틀버스")
                    ? blueBusImage
                    : redBusImage
                }
                alt="bus image"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-base lg:text-lg">{busNumber}</h2>
              <p className="text-sm lg:text-base">
                {api.find((item) => item.bus_number === busNumber).heading_to}{" "}
                방면
              </p>
            </div>

            <div className={`content-center p-3 bg-neutral rounded-box ${timeToNextBuses[busNumber] === "운행종료" ? "text-red-400" : "text-green-400"}`}>
              <span
                className={`font-mono ${
                  timeToNextBuses[busNumber] === "곧 도착" || timeToNextBuses[busNumber] === "운행종료"
                    ? "text-base lg:text-xl"
                    : "text-xl lg:text-3xl"
                }`}
              >
                <span>{timeToNextBuses[busNumber]}</span>
              </span>
              {timeToNextBuses[busNumber] !== "곧 도착" && timeToNextBuses[busNumber] !== "운행종료" && (
                <span className="text-sm lg:text-lg">분</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default BusCard;
