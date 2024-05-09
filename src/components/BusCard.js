import api from '../api/api.json'
import redBusImage from '../assets/red_bus.png';

function BusCard() {
    const card = api.map((item, index) => {
        return (
            <div key={index} className="card card-side bg-base-100 shadow-xl my-4">
                <figure className="max-w-24 ml-4">
                    <img src={redBusImage} alt="bus image"/>
                </figure>

                <div className="card-body">
                    <h2 className="card-title">{item.bus_number}</h2>
                    <p>{item.heading_to} 방면</p>
                </div>

                <div className="content-center p-3 bg-neutral rounded-box text-green-400">
                    <span className="font-mono text-3xl">
                        <span>15</span>
                    </span>
                    분
                </div>
            </div>
        );
    });

    return <>{card}</>;
}

export default BusCard;
