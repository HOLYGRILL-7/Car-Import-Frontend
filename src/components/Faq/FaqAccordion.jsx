import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

// One question open at a time. Each question is a real button (keyboard and
// screen-reader friendly); a closed answer is inert so it can't be tabbed to
// or read out while it's hidden.
const FaqAccordion = ({ items }) => {
  const [openId, setOpenId] = useState(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-gray-200 rounded-2xl bg-white shadow-lg px-5 sm:px-8">
      {items.map(({ id, question, answer }) => {
        const open = openId === id;
        const buttonId = `${baseId}-${id}-q`;
        const panelId = `${baseId}-${id}-a`;
        return (
          <div key={id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-primary"
              >
                <span>{question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-accent-dark transition-transform duration-300 motion-reduce:transition-none ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 leading-relaxed text-neutral">{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
