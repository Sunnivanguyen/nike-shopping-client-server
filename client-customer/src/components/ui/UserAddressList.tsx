import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { IUserAddress } from "../../types/UserType";

export default function UserAddressList({
  addresses,
}: {
  addresses: IUserAddress[];
}) {
  const [selected, setSelected] = useState(addresses[0]);
  return (
    <div className="w-full py-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {addresses?.length > 0 &&
              addresses.map((address: IUserAddress) => (
                <RadioGroup.Option
                  key={crypto.randomUUID()}
                  value={address}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                        : ""
                    }
                  ${checked ? "bg-sky-900/75 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {address.address_line_2
                                ? address.address_line_1
                                : `${address.address_line_1}, ${address.address_line_2}`}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              <span>
                                {!address.region ||
                                address.city === address.region
                                  ? address.city
                                  : `${address.city}, ${address.region}`}
                              </span>
                              <span aria-hidden="true">,</span>{" "}
                              <span>{address.country}</span>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
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

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
