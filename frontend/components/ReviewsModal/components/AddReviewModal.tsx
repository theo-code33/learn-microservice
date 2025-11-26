import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/types/review";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type AddReviewModalProps = {
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  stationId: string;
}

const AddReviewModal = ({
  setReviews,
  stationId
}: AddReviewModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  })

  const { handleSubmit, reset } = form;

  const onSubmit = (data: FieldValues) => {
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, stationId: stationId }),
    }).then(async res => {
      if (!res.ok) {
        throw new Error('Failed to add review');
      }
      const newReview = await res.json();
      setReviews(prevReviews => [newReview, ...prevReviews]);
      setOpen(false);
      reset();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-max">
          <Plus className="mr-1 h-4 w-4" />
          Ajouter un avis
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField
              name="rating"
              render={({ field }) => (
                <div>
                  <label>Note</label>
                  <Input type="number" min={1} max={5} {...field} />
                </div>
              )}
            />
            <FormField
              name="comment"
              render={({ field }) => (
                <div>
                  <label>Commentaire</label>
                  <Textarea {...field} />
                </div>
              )}
            />
            <Button type="submit">Ajouter</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddReviewModal;