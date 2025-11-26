import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import AddReviewModal from "./components/AddReviewModal";
import CardReview from "./components/CardReview";
import { Review } from "@/types/review";

type ReviewsModalProps = {
  stationId: string;
  haveReviews: boolean;
}

const ReviewsModal = ({
  stationId,
  haveReviews
}: ReviewsModalProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async (stationId: string) => {
    await fetch(`/api/reviews/station/${stationId}`).then(async res => {
      if (!res.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await res.json();
      setReviews(data);
    })
  }

  useEffect(() => {
    if (haveReviews) {
      fetchReviews(stationId);
    }
  }, [stationId, haveReviews]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-max">Voir les avis</Button>
      </DialogTrigger>
      <DialogContent className="h-4/5 overflow-x-scroll">
        <div className="flex flex-col gap-3">
          <AddReviewModal setReviews={setReviews} stationId={stationId} />
          <DialogTitle asChild>
            <h2 className="text-2xl font-bold mt-4">Avis des utilisateurs</h2>
          </DialogTitle>
          {reviews.length === 0 ? (
            <p>Aucun avis pour cette station.</p>
          ) : (
            reviews.map((review: Review) => (
              <CardReview key={review.id} review={review} />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewsModal;