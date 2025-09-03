// src/components/services/ContentMarketing.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setServiceCharge } from "../../redux/action/serviceSlice";
// import { setServiceCharge } from "../../servicesSlice";

import {
  setStoredData,
  getStoredData,
  clearLocalStorageOnRefresh,
} from "../../utils/storageUtils";

const CustomInput = ({ value, OnChange }) => {
  const handleDecrement = () => {
    OnChange(value > 0 ? value - 1 : 0);
    // console.log("decrement");
  };

  const handleIncrement = () => {
    // OnChange(value > 0 ? value + 1 : value + 2);
    OnChange(value + 1);
    // console.log("Increment");
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
const ContentMarketing = ({ nextService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  const chargeNames = [
    "Blogs",
    "Landing Pages",
    "Product Pages",
    "Category Pages",
    "Local Pages",
    "Other",
  ];

  const getInitialCharges = () => {
    const savedCharges = getStoredData("ContentMarketing");
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
  useEffect(() => {
    clearLocalStorageOnRefresh();

    const handleRefresh = () => {
      localStorage.clear();
      setCharges(
        chargeNames.reduce((acc, name) => {
          acc[name] = "";
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
    setStoredData("ContentMarketing", charges);
  }, [charges]);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleNext = () => {
    if (nextService) {
      router.push(`/services/${nextService}`);
    } else {
      router.push("/summary");
    }
  };

  const totalCost = isDropdownActive
    ? Object.entries(charges).reduce(
        (acc, [platform, charge]) => acc + Number(charge) * 0.5,
        0
      )
    : Object.entries(charges).reduce((acc, [platform, charge]) => {
        const rate = platform === "Blogs" ? 400 : 300; // Different rate for Blogs
        return acc + Number(charge) * rate;
      }, 0);

  const handleChargeChange = (platform, value) => {
    const updatedValue = isDropdownActive ? value : Number(value);

    const updatedCharges = { ...charges, [platform]: updatedValue };

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount)
    );

    const serviceTotal = isDropdownActive
      ? Object.entries(updatedCharges).reduce(
          (sum, [name, value]) => sum + Number(value) * 0.33,
          0
        )
      : Object.entries(updatedCharges).reduce((sum, [name, hours]) => {
          const rate = name === "Blogs" ? 400 : 300; // Different rate for Blogs
          return sum + hours * rate;
        }, 0);

    setCharges(updatedCharges);
    dispatch(
      setServiceCharge({
        serviceId: "4",
        charges: chargesToStore,
        ServiceName: "Content Marketing",
        totalCharges: serviceTotal,
      })
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-[28px] font-bold mb-4">
        Content Marketing - Add deliverables
      </h1>
      <div className="mb-4 flex items-center">
        <button
          onClick={() => {
            setIsDropdownActive((prev) => !prev);

            // Reset all platform charges to 0 when toggling
            const resetCharges = chargeNames.reduce((acc, platform) => {
              acc[platform] = 0;
              return acc;
            }, {});

            setCharges(resetCharges);
            dispatch(
              setServiceCharge({
                serviceId: "4",
                charges: resetCharges,
                ServiceName: "Content Marketing",
                totalCharges: 0,
              })
            );
          }}
          className={`w-12 h-6 flex items-center bgg300 rounded-full p-1 cursor-pointer transition-colors ${
            isDropdownActive ? "bg-[#013958]" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isDropdownActive ? "translate-x-6" : ""
            }`}
          ></div>
        </button>
        <label className="ml-4">
          {isDropdownActive ? "Word Count" : "Word Count"}
        </label>
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left text-[14px] font-normal p-2">Platforms</th>
            <th className="text-left text-[14px] font-normal p-2">
              {isDropdownActive ? "Word Count" : "Number of Deliverables"}
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
              <td className="p-2 w-[170px] flex bgwhite items-center">
                {!isDropdownActive ? (
                  <CustomInput
                    value={charges[platform]}
                    OnChange={(value) => handleChargeChange(platform, value)}
                  />
                ) : (
                  <input
                    type="number"
                    min="0"
                    value={charges[platform]}
                    onChange={(e) =>
                      handleChargeChange(platform, e.target.value)
                    }
                    className="border-none p-2 w-full ml-3"
                    placeholder="100"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[24px] font-semibold">Total cost</span>
        <span className="text-[24px] font-semibold">
          ${totalCost.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-start gap-5">
        <button
          onClick={() => navigate(-1)}
          className="bg-[white] text-[#006296] border-[#006296] border-2 px-4 py-2 rounded"
        >
          Go back
        </button>
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

export default ContentMarketing;
