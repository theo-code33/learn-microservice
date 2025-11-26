type CardReviewProps = {
  review: {
    userId: string;
    stationId: string;
    rating: number;
    comment?: string;
    createdAt: string;
  };
}

const CardReview = ({
  review
}: CardReviewProps) => {
  return (
    <div className="border p-4 rounded-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Utilisateur: {review.userId}</span>
        <span className="text-yellow-500">Note: {review.rating} / 5</span>
      </div>
      {review.comment && <p className="mb-2">{review.comment}</p>}
      <span className="text-sm text-gray-500">Posté le: {new Date(review.createdAt).toLocaleDateString()}</span>
    </div>
  );
}

export default CardReview;