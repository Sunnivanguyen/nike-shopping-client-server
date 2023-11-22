import React from "react";
import { IProductHighlight } from "../../types/ProductType";

const Highlights: React.FC<{ highlights: IProductHighlight[] }> = ({
  highlights,
}) => {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900 dark:text-slate-50">
        Highlights
      </h3>

      <div className="mt-4">
        <ul role="list" className="list-disc space-y-2 pl-4 text-sm ">
          {highlights &&
            highlights.length > 0 &&
            highlights.map((highlight: IProductHighlight) => (
              <li
                key={crypto.randomUUID()}
                className="text-gray-700 dark:text-slate-50"
              >
                <span className="text-gray-700 dark:text-slate-50">
                  {highlight.text}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Highlights;
