// `backdrop` (optional) is decorative art centred behind the whole text block
// (heading + subtitle): it sits under the text, doesn't take up space and
// ignores the mouse.
const HeroHeading = ({ title, highlight, subtitle, backdrop }) => {
  return (
    <div className="header-text relative space-y-5">
      {backdrop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-0 flex items-center justify-center"
        >
          {backdrop}
        </div>
      )}
      <h1 className="relative font-bold text-5xl text-center">
        {title} <span className="text-blue-400">{highlight}</span> Awaits
      </h1>
      <p className="relative text-center text-white font-semibold text-lg">
        {subtitle}
      </p>
    </div>
  );
};

export default HeroHeading;
