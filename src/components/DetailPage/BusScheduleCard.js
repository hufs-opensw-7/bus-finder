import React from "react";

function BusScheduleCard({ busSchedule }) {
  const currentTime = new Date();
  const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6; // 0 for Sunday, 6 for Saturday
  const schedule = isWeekend ? busSchedule.weekend : busSchedule.weekday;

  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const closestTime = schedule.reduce((prev, curr) => {
    const [prevHours, prevMinutes] = prev.split(":").map(Number);
    const [currHours, currMinutes] = curr.split(":").map(Number);
    const prevDiff = Math.abs(prevHours * 60 + prevMinutes - (currentHours * 60 + currentMinutes));
    const currDiff = Math.abs(currHours * 60 + currMinutes - (currentHours * 60 + currentMinutes));
    return currDiff < prevDiff ? curr : prev;
  });

  return (
    <div className="card bg-neutral my-4">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>평일</th>
              <th>주말</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {busSchedule.weekday.map((weekdayTime, index) => (
              <tr key={index}>
                <td className={!isWeekend && weekdayTime === closestTime ? "bg-base-200" : ""}>
                  {weekdayTime}
                </td>
                <td className={isWeekend && index < busSchedule.weekend.length && busSchedule.weekend[index] === closestTime ? "bg-base-200" : ""}>
                  {index < busSchedule.weekend.length ? busSchedule.weekend[index] : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusScheduleCard;
