import { RadioGroup } from "@headlessui/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function ImageColor({ image }) {
  return (
    <RadioGroup.Option
      key={image.id}
      value={image}
      className={({ active, checked }) =>
        `${
          active
            ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
            : ""
        }
      ${checked ? "bg-sky-900 text-white" : "bg-white"}
        relative w-full cursor-pointer rounded-lg shadow-md focus:outline-none`
      }
    >
      <RadioGroup.Description as="span">
        <img
          src={`${BASE_URL}/api/v1/product/image/${image.image_src}`}
          alt={image.image_alt}
          className="h-32 w-full rounded-md shadow-lg"
        />
      </RadioGroup.Description>
    </RadioGroup.Option>
  );
}
