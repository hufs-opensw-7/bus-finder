import React from "react";

function BusScheduleCard({ busSchedule }) {
  const currentTime = new Date();
  const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6; // 0 for Sunday, 6 for Saturday
  const schedule = isWeekend ? busSchedule.weekend : busSchedule.weekday;

  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  const nextTime = schedule.find(time => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes > currentTotalMinutes;
  }) || schedule[0];

  const hasWeekendSchedule = busSchedule.weekend && busSchedule.weekend.length > 0;

  return (
    <div className="card bg-neutral my-4">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>평일</th>
              {hasWeekendSchedule && <th>주말</th>}
            </tr>
          </thead>
          <tbody className="text-center">
            {busSchedule.weekday.map((weekdayTime, index) => (
              <tr key={index}>
                <td className={!isWeekend && weekdayTime === nextTime ? "bg-base-200" : ""}>
                  {weekdayTime}
                </td>
                {hasWeekendSchedule && (
                  <td className={isWeekend && index < busSchedule.weekend.length && busSchedule.weekend[index] === nextTime ? "bg-base-200" : ""}>
                    {index < busSchedule.weekend.length ? busSchedule.weekend[index] : ""}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusScheduleCard;
