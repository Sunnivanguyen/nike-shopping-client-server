/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import ButtonMoveBack from "../../components/ui/ButtonMoveBack";
import useAuth from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { validateSize, isImage } from "../../utils/fileValidation";
import { toast } from "react-toastify";
import { IoLocation } from "react-icons/io5";
import { IUser, IUserAddress } from "../../types/UserType";
import UserAddressList from "../../components/ui/UserAddressList";

const SettingPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [countryList, setCountryList] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [image, setImage] = useState<any>();

  let userData: IUser | null = null;
  let userAddressData: IUserAddress | null = null;
  if (user) {
    userData = user.user;
    userAddressData = user.addresses;
  }

  const [imageSrc, setImageSrc] = useState<string>(() => {
    if (userData?.avatar) {
      return userData.avatar;
    }
    return "";
  });
  const [firstName, setFirstName] = useState<string>(() => {
    if (userData?.first_name) {
      return userData.first_name;
    }
    return "";
  });
  const [lastName, setLastName] = useState<string>(() => {
    if (userData?.last_name) {
      return userData.last_name;
    }
    return "";
  });
  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    if (userData?.phone_number) {
      return userData.phone_number;
    }
    return "";
  });
  const [country, setCountry] = useState<string>(() => {
    if (userAddressData?.country) {
      return userAddressData.country;
    }
    return "";
  });
  const [city, setCity] = useState<string>(() => {
    if (userAddressData?.city) {
      return userAddressData.city;
    }
    return "";
  });
  const [region, setRegion] = useState<string>(() => {
    if (userAddressData?.region) {
      return userAddressData.region;
    }
    return "";
  });
  const [addressLine1, setAddressLine1] = useState<string>(() => {
    if (userAddressData?.address_line_1) {
      return userAddressData.address_line_1;
    }
    return "";
  });
  const [addressLine2, setAddressLine2] = useState<string>(() => {
    if (userAddressData?.address_line_2) {
      return userAddressData.address_line_2;
    }
    return "";
  });

  const [postalCode, setPostalCode] = useState<number>(() => {
    if (userAddressData?.postal_code) {
      return userAddressData.postal_code;
    }
    return 0;
  });

  const [latitude, setLatitude] = useState<string>(() => {
    if (user?.latitude) {
      return userAddressData?.latitude;
    }
    return "";
  });

  const [longitude, setLongitude] = useState<string>(() => {
    if (userAddressData?.longitude) {
      return userAddressData.longitude;
    }
    return "";
  });
  const getEmail = function () {
    if (userData?.email) {
      return userData.email;
    }
    return "";
  };
  const email = getEmail();

  async function fetchCountries() {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch countries data");
      }
      const data = await response.json();
      const countryList = data
        .map((country: any) => country.name.common)
        .sort();

      setCountryList(countryList);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  }

  fetchCountries();

  const getGeoLocation = (e) => {
    e.preventDefault();

    console.log("getGeoLocation");
    async function fetchGeoLocation() {
      const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=40cbb33e1b5c4a41a6c94b7eb799bd68`;
      const response = await fetch(url);
      const data = await response.json();

      setCountry(data.country);
      setCity(data.city);
      setRegion(data.region);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setPostalCode(data.postal_code);
    }

    fetchGeoLocation();
  };

  function handleImageChange(e) {
    setImageError("");
    const img = e.target.files[0];
    // if no image selected
    if (!img) {
      return;
    }

    // check if image
    const result = isImage(img.name);
    if (!result) {
      const error = "File type should be a image";
      toast(error, { type: "error" });
      setImageError(error);
      return;
    }
    const isImageLarge = validateSize(img);
    if (isImageLarge) {
      const error = "File must be less or equal to 5MB";
      toast(error, { type: "error" });
      setImageError(error);
      return;
    }
    const reader = new FileReader();
    // converts to BASE 64
    reader.readAsDataURL(img);
    reader.addEventListener("load", () => {
      setImageSrc(reader.result);
      setImage(img);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("region", region);
    formData.append("address_line_1", addressLine1);
    formData.append("address_line_2", addressLine2);
    formData.append("postal_code", postalCode);
    formData.append("phone_number", phoneNumber);
    formData.append("photo", image);
    formData.append("latitude", String(latitude));
    formData.append("longitude", String(longitude));

    updateUser(formData);
  }

  return (
    <div className="mx-auto flex min-h-full flex-1 flex-col justify-center bg-white px-6 py-12 dark:bg-dark-100 dark:text-white lg:px-8">
      <ButtonMoveBack />
      <form className="mx-auto max-w-7xl" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            {/* Avatar */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Avatar
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {userData?.avatar ? (
                    <img
                      className="mr-3 inline-block h-12 w-12 rounded-full  ring-2 ring-white dark:text-white"
                      src={userData.avatar}
                      alt="user avatar"
                    />
                  ) : (
                    <FaUserCircle className="mr-3 inline-block h-10 w-10 text-black dark:text-white" />
                  )}
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {image ? (
                      <img
                        alt="card"
                        src={imageSrc}
                        className="mx-auto my-5 h-auto w-[300px] basis-1/2"
                        accept="image/*"
                      />
                    ) : (
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300 dark:text-white"
                        aria-hidden="true"
                      />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-white">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span className="mx-4">Upload a file </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="ml-2 pl-1 dark:text-white">
                        or drag and drop
                      </p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600 dark:text-white">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Use a permanent address where you can receive mail.
            </p>

            {/* First name and last name */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Phone number */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    disabled
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Address */}
              {userAddressData && (
                <div className="block sm:col-span-4">
                  <UserAddressList addresses={userAddressData} />
                </div>
              )}

              {/* Automitically set address */}
              <div className="block sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Get your location
                </label>
                <button
                  onClick={getGeoLocation}
                  className="text-black-700 mt-2 flex h-[36px] w-[36px] items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium shadow-sm hover:bg-sky-900 hover:text-white dark:hover:bg-sky-100"
                >
                  <IoLocation className="h-[24px] w-[24px] text-center dark:text-black" />
                </button>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-black sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {countryList.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Address Line 1 */}
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-black"
                >
                  Address Line 1
                </label>
                <div className="mt-2">
                  <input
                    value={addressLine1}
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                    }}
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Address Line 2 */}
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Address Line 2
                </label>
                <div className="mt-2">
                  <input
                    value={addressLine2}
                    onChange={(e) => {
                      setAddressLine2(e.target.value);
                    }}
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* City */}
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-black"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                    }}
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* ZIP / Postal code */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12 dark:text-white">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              {/* <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900 dark:text-white"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500 dark:text-white">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900 dark:text-white"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500 dark:text-white">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900 dark:text-white"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500 dark:text-white">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset> */}
              {/* <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset> */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white"
          >
            Save
          </button>
        </div>
      </form>{" "}
    </div>
  );
};

export default SettingPage;
