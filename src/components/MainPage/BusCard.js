import api from '../../api/api.json'
import redBusImage from '../../assets/red_bus.png';

function BusCard() {
    const card = api.map((item, index) => {
        return (
            <div key={index} className="card card-side bg-base-100 shadow-xl my-4">
                <figure className="max-w-20 lg:max-w-24 ml-3.5 -mr-4">
                    <img src={redBusImage} alt="bus image"/>
                </figure>

                <div className="card-body">
                    <h2 className="card-title text-base lg:text-lg">{item.bus_number}</h2>
                    <p className="text-sm lg:text-base">{item.heading_to} 방면</p>
                </div>

                <div className="content-center p-3 bg-neutral rounded-box text-green-400">
                    <span className="font-mono text-xl lg:text-3xl">
                        <span>15</span>
                    </span>
                    <span className="text-sm lg:text-lg">분</span>
                </div>
            </div>
        );
    });

    return <>{card}</>;
}

export default BusCard;
