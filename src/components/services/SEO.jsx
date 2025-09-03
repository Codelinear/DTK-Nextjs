import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setServiceCharge } from "../../redux/action/serviceSlice";
import {
  setStoredData,
  getStoredData,
  clearLocalStorageOnRefresh,
} from "../../utils/storageUtils";

const CustomInput = ({ value, OnChange }) => {
  const handleDecrement = () => {
    OnChange(value > 0 ? value - 1 : 0);
  };

  const handleIncrement = () => {
    OnChange(value + 1);
  };

  return (
    <div className="flex items-center border px-2 w-full bg-[#fff]">
      <button
        onClick={handleDecrement}
        className="px-3 text-[25px] font-bold border-r-2 border-opacity-20 border-black"
      >
        -
      </button>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => OnChange(Number(e.target.value))}
        className="border-none text-center w-full py-3"
        placeholder="100"
      />
      <button
        onClick={handleIncrement}
        className="px-3 text-[25px] font-bold border-l-2 border-opacity-20 border-black"
      >
        +
      </button>
    </div>
  );
};

const SEO = ({ nextService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceCharges = useSelector((state) => state.services.serviceCharges);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const chargeNames = [
    "Technical SEO Consulting",
    "Consulting",
    "Meta Data Optimization",
    "App Store Optimization",
    "Local Optimization",
  ];

  const getInitialCharges = () => {
    const savedCharges = getStoredData("SEO");
    if (savedCharges) {
      return savedCharges;
    } else {
      return chargeNames.reduce((acc, name) => {
        acc[name] = serviceCharges[name] || 0;
        return acc;
      }, {});
    }
  };

  const [charges, setCharges] = useState(getInitialCharges);
  const [dropdownValue, setDropdownValue] = useState(0);

  useEffect(() => {
    clearLocalStorageOnRefresh();

    const handleRefresh = () => {
      localStorage.clear();
      setCharges(
        chargeNames.reduce((acc, name) => {
          acc[name] = 0;
          return acc;
        }, {})
      );
    };

    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  useEffect(() => {
    setStoredData("SEO", charges);
  }, [charges]);

  // const handleChargeChange = (platform, value) => {
  //   const updatedCharges = { ...charges, [platform]: Number(value) };

  //   const chargesToStore = Object.fromEntries(
  //     Object.entries(updatedCharges).filter(([_, amount]) => amount)
  //   );
  //   setCharges(updatedCharges);
  //   dispatch(
  //     setServiceCharge({
  //       serviceId: "3",
  //       charges: chargesToStore,
  //       ServiceName: "SEO",
  //     })
  //   );
  // };

  const handleDropdownChange = (event) => {
    const value = Number(event.target.value);
    setDropdownValue(value);
    // dispatch(setServiceCharge({ serviceId: "3", charge: value }));

    const updatedCharges = { ...charges };

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount)
    );

    // Calculate total charges for this service (with a base cost of 150 for each hour)
    const serviceTotal = Object.values(updatedCharges).reduce(
      (sum, hours) => sum + hours * 150,
      0
    );

    setCharges(updatedCharges);
    dispatch(
      setServiceCharge({
        serviceId: "3",
        charges: chargesToStore,
        ServiceName: "SEO",
        totalCharges: value * 150,
      })
    );
  };

  const handleNext = () => {
    if (nextService) {
      router.push(`/services/${nextService}`);
    } else {
      router.push("/summary");
    }
  };

  const totalCost = isDropdownActive
    ? dropdownValue * 150
    : Object.values(charges).reduce(
        (acc, charge) => acc + Number(charge) * 150,
        0
      );

  const handleChargeChange = (platform, value) => {
    const updatedCharges = { ...charges, [platform]: Number(value) };

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount)
    );

    // Calculate total charges for this service (with a base cost of 150 for each hour)
    const serviceTotal = Object.values(updatedCharges).reduce(
      (sum, hours) => sum + hours * 150,
      0
    );

    setCharges(updatedCharges);
    dispatch(
      setServiceCharge({
        serviceId: "3",
        charges: chargesToStore,
        ServiceName: "SEO",
        totalCharges: serviceTotal,
      })
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-[28px] font-bold mb-4">
        Search Engine Optimization - Add hours
      </h1>
      <div className="mb-4 flex items-center">
        <button
          onClick={() => setIsDropdownActive((prev) => !prev)}
          className={`w-12 h-6 flex items-center bg-gray300 rounded-full p-1 cursor-pointer transition-colors ${
            isDropdownActive ? "bg-[#013958]" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isDropdownActive ? "translate-x-6" : ""
            }`}
          ></div>
        </button>
        <label className="ml-4">I’m not sure about the hours</label>
      </div>
      {!isDropdownActive ? (
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="text-left text-[14px] font-normal p-2">
                Services
              </th>
              <th className="text-left text-[14px] font-normal p-2">
                Number of Hours
              </th>
            </tr>
          </thead>

          <tbody>
            {chargeNames.map((platform) => (
              <tr
                key={platform}
                className="border-b-[1px] border-opacity-20 border-[#000]"
              >
                <td className="p-2 font-semibold text-[18px] w-full">
                  {platform}
                </td>
                <td className="p-2 w-[170px] flex bgwhite items-center ">
                  <CustomInput
                    value={charges[platform]}
                    OnChange={(value) => handleChargeChange(platform, value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mb-4 bg-white px-4 py-2 mt-10 rounded-lg">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            What’s your website size? *
          </label>
          <select
            value={dropdownValue}
            onChange={handleDropdownChange}
            className="shadow  :placeholder-opacity border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="0">select pages </option>
            <option value="10">1-50 Pages</option>
            <option value="15">51-1000 pages</option>
            <option value="20">1001-10000 pages </option>
            <option value="25"> 10001-100000 pages</option>
            <option value="30"> 100001+ </option>
          </select>
        </div>
      )}
      <div className="flex justify-between items-center mb-4 pt-8  ">
        <span className="text-[16px] font">Total hours required</span>
        {/* <span className="text-[16px]">{totalCost.toFixed(2)}</span> */}
        <span className="text-[16px]">
          {isDropdownActive ? (
            dropdownValue
          ) : (
            <>
              {Object.values(charges).reduce(
                (acc, charge) => acc + Number(charge),
                0
              )}
            </>
          )}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4 pt-8  border-black">
        <span className="text-[24px] font-semibold">Total Cost</span>
        <span className="text-[24px] font-semibold">
          ${totalCost.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-start gap-5">
        <buttonx
          onClick={() => navigate(-1)}
          className="bg-[white] text-[#006296] border-[#006296] border-2 px-4 py-2 rounded"
        >
          Go back
        </buttonx>
        <button
          onClick={handleNext}
          className="bg-[#009FF5] text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SEO;
