import { Station } from "@/types/stations";
import ReviewsModal from "../ReviewsModal";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type StationCardProps = {
  station: Station;
  reviewAverage?: number;
}
const StationCard = ({
  station,
  reviewAverage
}: StationCardProps) => {

  const freeBikesBgColor = useMemo(() => {
    if (station.free_bikes === 0) return 'bg-red-700';
    if (station.free_bikes / station.extra.slots < 0.3) return 'bg-orange-700';
    return 'bg-green-700';
  }, [station.free_bikes, station.extra.slots]);

  const emptySlotBgColor = useMemo(() => {
    if (station.empty_slots === 0) return 'bg-red-700';
    if (station.empty_slots / station.extra.slots < 0.3) return 'bg-orange-700';
    return 'bg-green-700';
  }, [station.empty_slots, station.extra.slots]);


  return (
    <div className="border w-full p-4 rounded-md shadow-md flex flex-col gap-4" id={`station-${station.id}`}>
      <h2 className="text-xl font-bold">{station.name}</h2>
      <div className="flex flex-col gap-2">
        <p className="mb-1">Adresse: <span className="font-semibold">{station.extra.address}</span></p>
        <p className="mb-1 flex flex-row gap-1 items-center">Vélos disponibles: <span className={cn("w-7 h-7 flex items-center justify-center text-white font-bold rounded-full", freeBikesBgColor)}>{station.free_bikes}</span></p>
        <p className="mb-1 flex flex-row gap-1 items-center">Emplacements libres: <span className={cn("w-7 h-7 flex items-center justify-center text-white font-bold rounded-full", emptySlotBgColor)}>{station.empty_slots}</span></p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p>
          Note moyenne: <span className="font-semibold">{reviewAverage ? `${reviewAverage.toFixed(2)} ⭐️` : 'Aucune note'}</span>
        </p>
        <ReviewsModal stationId={station.id} haveReviews={reviewAverage ? true : false} />
      </div>
    </div>
  );
}

export default StationCard;