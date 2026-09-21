import { Quote } from "lucide-react";
import StarRating from "./StarRating";
import { formatDate } from "../../utils/formatDate";

// One customer's testimonial: stars, their words, then their name and date.
const TestimonialCard = ({ testimonial }) => {
  const { customerName, quote, rating, date } = testimonial;
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <StarRating value={rating} />
        <Quote className="h-7 w-7 text-accent/40" aria-hidden="true" />
      </div>
      <blockquote className="mt-4 flex-1 whitespace-pre-line leading-relaxed text-neutral-dark wrap-break-word">
        “{quote}”
      </blockquote>
      <footer className="mt-5 border-t border-gray-100 pt-4">
        <p className="font-bold text-primary">{customerName}</p>
        <p className="text-sm text-neutral">{formatDate(date)}</p>
      </footer>
    </article>
  );
};

export default TestimonialCard;
