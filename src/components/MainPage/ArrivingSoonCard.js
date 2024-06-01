import React from "react";
import api from "../../api/api.json";

function ArrivingSoon() {
  const currentDate = new Date();
  const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6; // 0 for Sunday, 6 for Saturday

  // 현재 시간을 가져오는 함수
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 현재 시간
  const currentTime = getCurrentTime();

  // 현재 시간과 버스 도착 시간을 비교하여 5분 이내에 도착하는지 확인하는 함수
  const isClose = (busTime, currentTime) => {
    const [busHour, busMinute] = busTime.split(":").map(Number);
    const [currentHour, currentMinute] = currentTime.split(":").map(Number);
    const busTimestamp = busHour * 60 + busMinute;
    const currentTimestamp = currentHour * 60 + currentMinute;
    return (
      busTimestamp - currentTimestamp <= 5 &&
      busTimestamp - currentTimestamp >= 0
    );
  };

  // 버스 도착 예정 시간을 파싱하여 현재 시간과 비교하고, 2분 이내에 도착하는 버스 번호들을 가져오는 함수
  const getClosestBuses = () => {
    const closestBuses = [];

    if (!Array.isArray(api)) {
      console.error("API data is not an array:", api);
      return closestBuses;
    }

    api.forEach((bus) => {
      if (!bus.schedule) {
        console.error("Bus schedule is undefined:", bus);
        return;
      }

      const schedules = isWeekend ? bus.schedule.weekend : bus.schedule.weekday;

      if (!Array.isArray(schedules)) {
        console.error("Schedules is not an array:", schedules);
        return;
      }

      schedules.forEach((time) => {
        if (isClose(time, currentTime)) {
          closestBuses.push(bus.bus_number);
        }
      });
    });

    return closestBuses;
  };

  // 가장 가까운 시간에 도착하는 버스 번호들
  const closestBuses = getClosestBuses();

  return (
    <div role="alert" className="alert shadow-lg my-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 className="font-bold text-sm lg:text-base">잠시 후 도착 버스</h3>
        {closestBuses.length > 0 ? (
          <div className="text-sm lg:text-base">{closestBuses.join(" ")}</div>
        ) : (
          <div className="text-sm lg:text-base">없음</div>
        )}
      </div>
    </div>
  );
}

export default ArrivingSoon;
