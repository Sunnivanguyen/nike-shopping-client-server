// import { RadioGroup } from "@headlessui/react";
// import ImageColor from "./ImageColor";
// import { IProductImage } from "../../types/ProductType";
// // const plans = [
// //   {
// //     name: "Startup",
// //     ram: "12GB",
// //     cpus: "6 CPUs",
// //     disk: "160 GB SSD disk",
// //   },
// //   {
// //     name: "Business",
// //     ram: "16GB",
// //     cpus: "8 CPUs",
// //     disk: "512 GB SSD disk",
// //   },
// //   {
// //     name: "Enterprise",
// //     ram: "32GB",
// //     cpus: "12 CPUs",
// //     disk: "1024 GB SSD disk",
// //   },
// // ];

// export default function ImageColors({
//   images,
//   selectedColor,
//   setSelectedColor,
// }) {
//   // const [selectedColor, setSelectedColor] = useState(plans[0]);

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <RadioGroup value={selectedColor} onChange={setSelectedColor}>
//         <RadioGroup.Label className="sr-only">Server image</RadioGroup.Label>
//         {images &&
//           images.length > 0 &&
//           images.map((image: IProductImage) => (
//             <ImageColor key={crypto.randomUUID()} image={image} />
//           ))}
//       </RadioGroup>
//     </div>
//   );
// }

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { IProductImage } from "../../types/ProductType";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const plans = [
  {
    name: "Startup",
    ram: "12GB",
    cpus: "6 CPUs",
    disk: "160 GB SSD disk",
  },
  {
    name: "Business",
    ram: "16GB",
    cpus: "8 CPUs",
    disk: "512 GB SSD disk",
  },
  {
    name: "Enterprise",
    ram: "32GB",
    cpus: "12 CPUs",
    disk: "1024 GB SSD disk",
  },
];

export default function ImageColors({ images }) {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="mt-10">
      <div className="w-full">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">
            Choose a color
          </RadioGroup.Label>
          <div className="grid grid-cols-3 gap-4 ">
            {images.map((image: IProductImage) => (
              <RadioGroup.Option
                key={crypto.randomUUID()}
                value={image}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-1 py-1 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-32 items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <img
                              src={`${BASE_URL}/api/v1/product/image/${image.image_src}`}
                              alt={image.image_alt}
                              className="h-32 w-32 rounded-md shadow-lg"
                            />
                          </RadioGroup.Description>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
