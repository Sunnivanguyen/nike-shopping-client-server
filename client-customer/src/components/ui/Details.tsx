import React from "react";
import { IProductDetail } from "../../types/ProductType";

const Details: React.FC<{ details: IProductDetail[] }> = ({ details }) => {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
        Details
      </h3>

      <div className="mt-4">
        <ul role="list" className="list-disc space-y-2 pl-4 text-sm ">
          {details &&
            details.length > 0 &&
            details.map((detail: IProductDetail) => (
              <li
                key={crypto.randomUUID()}
                className="text-gray-700 dark:text-slate-50"
              >
                <span className="text-gray-700 dark:text-slate-50">
                  {detail.text}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Details;
