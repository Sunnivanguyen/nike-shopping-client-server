import { RadioGroup } from "@headlessui/react";
import { IProductImage } from "../../types/ProductType";
import { Link } from "react-router-dom";
import useRoutes from "../../hooks/useRoutes";

export default function ImageColors({
  selectedColor,
  setSelectedColor,
  images,
}) {
  const { currentPage } = useRoutes();
  const selectedIndex = images?.findIndex(
    (image: IProductImage) => image?.id === selectedColor?.id,
  );

  return (
    <div className="mt-10">
      <div className="w-full">
        <RadioGroup value={images[selectedIndex]} onChange={setSelectedColor}>
          <RadioGroup.Label className="sr-only">
            Choose a color
          </RadioGroup.Label>
          <div className="grid grid-cols-3 gap-4 ">
            {images?.length &&
              images.map((image: IProductImage) => (
                <RadioGroup.Option
                  key={crypto.randomUUID()}
                  value={image}
                  className={({ active, checked }) =>
                    `${active ? "" : ""}
                  ${
                    checked
                      ? "bg-sky-900 bg-opacity-75 px-0.5 py-0.5 text-white"
                      : "bg-white bg-opacity-100 px-0 py-0"
                  }
                  relative flex cursor-pointer rounded-lg  shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-32 items-center justify-between">
                        <Link to={`/${currentPage}/${image.product_code}`}>
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                  checked
                                    ? "bg-white bg-opacity-100"
                                    : "text-gray-500"
                                }`}
                              >
                                <img
                                  src={image.image_src}
                                  alt={image.image_alt}
                                  className="h-32 w-32 rounded-md shadow-lg"
                                />
                              </RadioGroup.Description>
                            </div>
                          </div>
                        </Link>
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
