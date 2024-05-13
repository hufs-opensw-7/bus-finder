function BusScheduleCard({ busSchedule }) {
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