import React from "react";

import { IProductSize } from "../../types/ProductType";
import { RadioGroup } from "@headlessui/react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Sizes: React.FC<{ sizes: IProductSize[]; selectedSize: number }> = ({
  sizes,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Size
        </h3>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Size guide
        </a>
      </div>

      <RadioGroup
        value={selectedSize}
        onChange={setSelectedSize}
        className="mt-4"
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {sizes &&
            sizes.length > 0 &&
            sizes.map((size: IProductSize) => (
              <RadioGroup.Option
                key={crypto.randomUUID()}
                value={size}
                disabled={!size.in_stock}
                className={({ active }) =>
                  classNames(
                    size.in_stock > 0
                      ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                      : "cursor-not-allowed bg-gray-50 text-gray-200",
                    active ? "ring-2 ring-indigo-500" : "",
                    "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6",
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <RadioGroup.Label as="span">{size.id}</RadioGroup.Label>
                    {size.in_stock > 0 ? (
                      <span
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-indigo-500" : "border-transparent",
                          "pointer-events-none absolute -inset-px rounded-md",
                        )}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                      >
                        <svg
                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          stroke="currentColor"
                        >
                          <line
                            x1={0}
                            y1={100}
                            x2={100}
                            y2={0}
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </RadioGroup.Option>
            ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default Sizes;
