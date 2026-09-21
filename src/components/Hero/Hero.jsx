import HeroHeading from "./HeroHeading";
// Same art as sale-plane.png with the "Sale" lettering painted out, so no
// letter shapes sit behind (and muddy) the heading.
import plane from "../../assets/sale-plane-blank.png";

const Hero = () => {
  return (
    <div className="relative h-[500px] overflow-hidden mb-10 bg-black">
      {/* Foreground Content. mt-18 pushes the text block below the hero's centre
          so the (taller) plane behind it has room above and stays inside the
          hero on every side. */}
      <div className="relative z-10 flex flex-col mt-18 items-center justify-center h-full gap-6 text-white px-4">
        <HeroHeading
          title="Your"
          highlight="Dream Car"
          subtitle="Find Certified New & Used Cars"
          backdrop={
            <img
              src={plane}
              alt=""
              className="w-[min(150%,calc(100vw-2rem))] max-w-none shrink-0 select-none opacity-[0.18]"
            />
          }
        />
      </div>
    </div>
  );
};

export default Hero;
