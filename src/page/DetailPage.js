import { useParams } from "react-router-dom";
import BusInformationCard from "../components/DetailPage/BusInformationCard";
import BusScheduleCard from "../components/DetailPage/BusScheduleCard";
import { useEffect, useState } from "react";
import api from "../api/api.json";

function DetailPage() {
  const { busNumber } = useParams();
  const [busInfo, setBusInfo] = useState();
  useEffect(() => {
    const bus = api.find((item) => item.bus_number === busNumber);
    setBusInfo(bus);
  }, [busNumber]);
  return (
    <>
      {busInfo && (
        <BusInformationCard
          busNumber={busInfo.bus_number}
          headingTo={busInfo.heading_to}
        />
      )}
      {busInfo && (<BusScheduleCard busSchedule={busInfo.schedule} />)}
    </>
  );
}

export default DetailPage;
