function BusScheduleCard({ busSchedule }) {
  const currentTime = new Date();

  const closestTime = busSchedule.weekday.reduce((prev, curr) => {
    const [hourPrev, minutePrev] = prev.split(":").map(Number);
    const [hourCurr, minuteCurr] = curr.split(":").map(Number);
    const timePrev = new Date(0, 0, 0, hourPrev, minutePrev);
    const timeCurr = new Date(0, 0, 0, hourCurr, minuteCurr);
    const diffPrev = Math.abs(currentTime - timePrev);
    const diffCurr = Math.abs(currentTime - timeCurr);
    return diffPrev < diffCurr ? prev : curr;
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
              <tr key={index} className={weekdayTime === closestTime ? "bg-base-200" : ""}>
                <td>{weekdayTime}</td>
                <td>{index < busSchedule.weekend.length ? busSchedule.weekend[index] : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusScheduleCard;