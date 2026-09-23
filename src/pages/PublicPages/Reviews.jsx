import TestimonialCard from "../../components/Reviews/TestimonialCard";
import DealerReviewCard from "../../components/Reviews/DealerReviewCard";
import Skeleton from "../../components/Skeleton/Skeleton";
import { useFeaturedTestimonials } from "../../hooks/useFeaturedTestimonials";
import { useDealerReviewCars } from "../../hooks/useDealerReviewCars";

const SectionHeading = ({ id, title, description }) => (
  <div className="mb-10 space-y-3 text-center">
    <h2
      id={id}
      className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl"
    >
      {title}
    </h2>
    <p className="mx-auto max-w-2xl text-lg text-neutral">{description}</p>
    <div className="mx-auto h-1 w-24 rounded-full bg-accent"></div>
  </div>
);

// Shown in place of a section's content while it loads, fails or is empty.
const Notice = ({ children }) => (
  <p className="rounded-2xl bg-white p-8 text-center text-lg text-neutral shadow-lg">
    {children}
  </p>
);

const Reviews = () => {
  const testimonials = useFeaturedTestimonials();
  const dealerReviews = useDealerReviewCars();

  return (
    <div className="min-h-screen">
      {/* Plain page title, the same as on Used Cars / New Cars (the navbar is
          fixed, so it starts below it) */}
      <div className="pt-24 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-5xl font-bold text-accent-text">
          Reviews
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* What Our Customers Say */}
        <section aria-labelledby="customers-heading" className="pt-16">
          <SectionHeading
            id="customers-heading"
            title="What Our Customers Say"
            description="Kind words from the people we've helped find their car."
          />
          {testimonials.loading ? (
            <div
              role="status"
              aria-busy="true"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <span className="sr-only">Loading reviews...</span>
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-56 rounded-2xl" />
              ))}
            </div>
          ) : testimonials.error ? (
            <Notice>
              Couldn't load reviews right now. Please try again later.
            </Notice>
          ) : testimonials.items.length === 0 ? (
            <Notice>No reviews yet — check back soon.</Notice>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.items.map((testimonial) => (
                <li key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Our Take on These Cars */}
        <section aria-labelledby="take-heading" className="py-16">
          <SectionHeading
            id="take-heading"
            title="Our Take on These Cars"
            description="Our own thoughts on some of the cars we've hand-picked."
          />
          {dealerReviews.loading ? (
            <div role="status" aria-busy="true" className="space-y-6">
              <span className="sr-only">Loading reviews...</span>
              <Skeleton className="h-72 rounded-2xl" />
            </div>
          ) : dealerReviews.error ? (
            <Notice>
              Couldn't load reviews right now. Please try again later.
            </Notice>
          ) : dealerReviews.cars.length === 0 ? (
            <Notice>No dealer reviews yet — check back soon.</Notice>
          ) : (
            <ul className="space-y-8">
              {dealerReviews.cars.map((car) => (
                <li key={car.id}>
                  <DealerReviewCard car={car} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Reviews;
