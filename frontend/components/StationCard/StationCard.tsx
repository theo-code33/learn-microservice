import { Station } from "@/types/stations";
import ReviewsModal from "../ReviewsModal";

type StationCardProps = {
  station: Station;
  reviewAverage?: number;
}
const StationCard = ({
  station,
  reviewAverage
}: StationCardProps) => {
  return (
    <div className="border w-full p-4 rounded-md shadow-md flex flex-col gap-4" id={`station-${station.id}`}>
      <h2 className="text-xl font-bold">{station.name}</h2>
      <div className="flex flex-col gap-2">
        <p className="mb-1">Adresse: {station.extra.address}</p>
        <p className="mb-1">Vélos disponibles: {station.free_bikes}</p>
        <p className="mb-1">Emplacements libres: {station.empty_slots}</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p>
          Note moyenne: {reviewAverage ? `${reviewAverage.toFixed(2)} ⭐️` : 'Aucune note'}
        </p>
        <ReviewsModal stationId={station.id} haveReviews={reviewAverage ? true : false} />
      </div>
    </div>
  );
}

export default StationCard;