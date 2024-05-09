function BusScheduleCard() {
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
                        <tr className="bg-base-200">
                            <td>4:40</td>
                            <td>4:40</td>
                        </tr>
                        <tr>
                            <td>5:00</td>
                            <td>5:00</td>
                        </tr>
                        <tr>
                            <td>5:20</td>
                            <td>5:20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BusScheduleCard;