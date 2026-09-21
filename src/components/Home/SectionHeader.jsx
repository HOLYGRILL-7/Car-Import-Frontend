import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// "View All" link colours. "orange" is the default; New Arrivals uses "blue".
const LINK_TONES = {
  orange: "text-accent hover:text-accent-light",
  blue: "text-blue-600 hover:text-blue-500",
};

// On phones the "View All" link drops under the title instead of squeezing
// beside it.
const SectionHeader = ({
  icon,
  title,
  description,
  linkTo,
  linkText,
  tone = "orange",
}) => {
  return (
    <div className="flex flex-col gap-3 mb-8 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="text-3xl">
            <img src={icon} alt="" />
          </span>
        )}
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            {title}
          </h2>
          {description && (
            <p className="text-neutral text-base sm:text-lg">{description}</p>
          )}
        </div>
      </div>
      {linkTo && linkText && (
        <Link
          to={linkTo}
          className={`${LINK_TONES[tone]} font-semibold flex items-center gap-2 whitespace-nowrap shrink-0`}
        >
          {linkText}
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
