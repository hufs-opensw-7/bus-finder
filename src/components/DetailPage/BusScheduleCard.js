function BusScheduleCard({ busSchedule }) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const formattedCurrentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    const closestTime = busSchedule.weekday.reduce((prev, curr) => (
        Math.abs(new Date(`2000-01-01T${prev}`) - currentTime) < Math.abs(new Date(`2000-01-01T${curr}`) - currentTime) ? prev : curr
    ));

    console.log(closestTime)

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
                            <td>{index < busSchedule.weekend.length ? busSchedule.weekend[index] : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BusScheduleCard;