import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import { IAdminAddress } from "../../types/AddressType";
import UploadPhoto from "./UploadPhoto";

const AdminInfomation = ({ closeModal }) => {
  const { admin, updateAdmin, fetchAdmins, adminAddresses } = useAuth();
  const [email, setEmail] = useState(admin?.email);
  const [firstname, setFirstname] = useState(admin?.first_name || "");
  const [lastname, setLastname] = useState(admin?.last_name || "");
  const [phonenumber, setPhonenumber] = useState(admin?.phone_number || "");
  // const [photo, setPhoto] = useState(admin?.avatar || "");
  const [status, setStatus] = useState(admin?.status || "");

  const addressDefault =
    adminAddresses &&
    adminAddresses.length > 0 &&
    adminAddresses.filter((el: IAdminAddress) => el.is_default);

  const [country, setCountry] = useState(
    (addressDefault && addressDefault[0]?.country) || "",
  );
  const [city, setCity] = useState(
    (addressDefault && addressDefault[0]?.city) || "",
  );
  const [street, setStreet] = useState(
    (addressDefault && addressDefault[0]?.street) || "",
  );

  async function fetchData(dataUpdate) {
    await updateAdmin(admin.id, dataUpdate);
    await fetchAdmins();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const statusNum = status === "active" ? 1 : 0;

    const dataUpdate = {
      email,
      first_name: firstname,
      last_name: lastname,
      phone_number: phonenumber,
      street,
      city,
      country,
      status: statusNum,
    };

    closeModal();

    fetchData(dataUpdate);
  }

  return (
    <form
      className="mx-auto mt-2 max-w-7xl"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
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
              type="text"
              name="last-name"
              id="last-name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              autoComplete="family-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-white sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Status
          </label>
          <div className="mt-2">
            <input
              id="status"
              name="status"
              type="status"
              value={status ? "active" : "unactive"}
              onChange={(e) => setStatus(e.target.value)}
              autoComplete="status"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Phone number
          </label>
          <div className="mt-2">
            <input
              id="phone-number"
              name="phone-number"
              type="phone-number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              autoComplete="phone-number"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
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
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              autoComplete="country-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-white sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Viet Nam</option>
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="street-address"
              id="street-address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-white sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-white sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="region"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            State / Province
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="region"
              id="region"
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-white sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-white sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <UploadPhoto id={admin?.id} />
      <div className="mt-4 flex gap-5">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default AdminInfomation;
