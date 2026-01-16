import React from "react";
import { latestReviews, winners } from "../../data/carsData";
import redCar_front from "../../assets/Images/redCar-frontside.png";
import whiteCar_front from "../../assets/Images/whiteCar-frontside.png";
import { Trophy, ArrowRight, Calendar, Star } from "lucide-react";

const Reviews = () => {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="inner-div">
          <div className="hero-section w-full p-20 bg-linear-to-b from bg-neutral-dark via-neutral to-bg-neutral-light h-[390px] shadow-2xl rounded-2xl px-14 grid grid-cols-2">
            <h1 className="font-bold text-8xl z-20 col-span-2 flex justify-center items-center gap-10  text-accent">
              CAR <span>REVIEWS</span>
            </h1>
          </div>
          <div className="front redCar absolute right-8 top-14 z-10">
            <img src={redCar_front} alt="" width={400} />
          </div>
          <div className="rear redCar absolute left-8 top-5">
            <img src={whiteCar_front} alt="" width={420} />
          </div>
        </div>

        {/* Award Winning Cars Section */}
        <div className="bg-white rounded-3xl mt-10 shadow-xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Text Side */}
            <div className="md:col-span-1 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-linear-to-r from-accent to-accent-light text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg">
                  <Trophy className="w-4 h-4" />
                  {year} CAR OF THE YEAR AWARDS
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                  AND THE WINNERS ARE...
                </h2>

                <p className="text-lg text-neutral leading-relaxed">
                  ...Discover our expert picks for the best cars of {year}{" "}
                  across multiple categories, tested and reviewed by our team of
                  automotive specialists.
                </p>
              </div>

              <button className="w-full bg-linear-to-r from-primary to-primary-dark text-white font-bold py-4 px-8 rounded-xl hover:scale-105 transition-all shadow-lg flex items-center justify-center cursor-pointer gap-2 group">
                See All Winners
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Images Side - Winner Cards */}
            <div className="md:col-span-2 grid md:grid-cols-3 gap-6">
              {winners.map((winner, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg  overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-48  flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={winner.image}
                      alt={winner.car}
                      className="w-full h-full object-cover rounded-lg duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-6">
                    <div className="flex items-center gap-2 text-accent">
                      <winner.icon className="w-6 h-6" />
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {winner.category}
                      </span>
                    </div>

                    <div className="description space-y-5">
                      <h3 className="text-xl font-bold text-primary ">
                        {winner.car}
                      </h3>
                      <p className="text-md text-neutral leading-relaxed">
                        {winner.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Reviews Section */}
        <div className="py-12">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Latest Reviews
            </h2>
            <p className="text-xl text-neutral max-w-2xl mx-auto">
              Expert analysis, in-depth testing, and comprehensive car reviews
              from our team
            </p>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg  overflow-hidden cursor-pointer group"
              >
                {/* Image */}
                <div className="h-56 bg-neutral-dark overflow-hidden">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-neutral">
                      <Calendar className="w-4 h-4" />
                      <span>{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      {review.rating}/10
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                    {review.title}
                  </h3>

                  <p className="text-neutral leading-relaxed line-clamp-2">
                    {review.excerpt}
                  </p>

                  <button className="text-accent font-semibold hover:underline flex items-center gap-2 cursor-pointer group/btn">
                    Read Full Review
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105 cursor-pointer">
              Load More Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
