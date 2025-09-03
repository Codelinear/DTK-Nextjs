// src/components/services/PaidAds.js
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
const PaidAds = ({ nextService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  const chargeNames = [
    "Google Ads",
    "Bing Ads",
    "Facebook Ads",
    "Instagram Ads",
    "LinkedIn Ads",
  ];

  const getInitialCharges = () => {
    const savedCharges = getStoredData("paidAdsCharges");
    if (savedCharges) {
      return savedCharges;
    } else {
      return chargeNames.reduce((acc, name) => {
        acc[name] = serviceCharges[name] || "";
        return acc;
      }, {});
    }
  };

  const [charges, setCharges] = useState(getInitialCharges);
  const [error, setError] = useState(false);

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
    setStoredData("paidAdsCharges", charges);
  }, [charges]);

  // const totalcosdt = Object.values(charges)
  //   .reduce((acc, charge) => acc + (Number(charge) || 0), 0)
  //   .toFixed(2);

  const getRangeDetails = (total) => {
    const ranges = [
      { min: 1, max: 4999, paidAdsOrSocial: 1000, percentage: 0.12 },
      { min: 5000, max: 14999, paidAdsOrSocial: 1500, percentage: 0.1 },
      { min: 15000, max: 29999, paidAdsOrSocial: 2000, percentage: 0.09 },
      { min: 30000, max: 59999, paidAdsOrSocial: 2500, percentage: 0.08 },
      { min: 60000, max: 99999, paidAdsOrSocial: 3000, percentage: 0.07 },
      { min: 100000, max: 299999, paidAdsOrSocial: 3500, percentage: 0.06 },
      {
        min: 300000,
        max: Infinity,
        paidAdsOrSocial: "Custom Quote",
        percentage: "Custom Quote",
      },
    ];

    return ranges.find((range) => total >= range.min && total <= range.max);
  };

  const totalcosdt = Object.values(charges)
    .reduce((acc, charge) => acc + (Number(charge) || 0), 0)
    .toFixed(2);

  const rangeDetails = getRangeDetails(totalcosdt);

  let overallCost;
  let baseManagementFee;
  let adRunningFeePercentage;

  if (rangeDetails) {
    if (rangeDetails.paidAdsOrSocial !== "Custom Quote") {
      const percentageFee = totalcosdt * rangeDetails.percentage;
      overallCost = Number(rangeDetails.paidAdsOrSocial) + percentageFee;
      baseManagementFee = rangeDetails.paidAdsOrSocial;
      adRunningFeePercentage = rangeDetails.percentage * 100; // Convert to percentage
    } else {
      overallCost = "Custom Quote";
      baseManagementFee = "Custom Quote";
      adRunningFeePercentage = "Custom Quote";
    }
  } else {
    overallCost = 0;
    baseManagementFee = 0;
    adRunningFeePercentage = 0;
  }

  const finalpercent = (adRunningFeePercentage / 100).toFixed(2) * totalcosdt;

  const [data, setData] = useState();
  // const tosend = Number(overallCost) + Number(totalcosdt);
  const tosend = Number(overallCost);

  const handleChargeChange = (platform, value) => {
    if (value < 1000) {
      setError(true);
    } else {
      setError(false);
    }
    const updatedCharges = { ...charges, [platform]: value };

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(
        ([_, amount]) => amount.trim() !== ""
      )
    );
    setData(chargesToStore);

    setCharges(updatedCharges);
  };

  const handleNext = () => {
    dispatch(
      setServiceCharge({
        serviceId: "2",
        charges: data,
        ServiceName: "Paid Ads",
        totalCharges: tosend,
      })
    );
    if (nextService) {
      router.push(`/services/${nextService}`);
    } else {
      router.push("/summary");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-[28px] font-bold mb-4">
        Paid Media - Add average monthly budget
      </h1>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left text-[14px] font-normal p-2">Platforms</th>
            <th className="text-left text-[14px] font-normal p-2">
              Average monthly budget
            </th>
          </tr>
        </thead>

        {/* {error ? (
          <p className="text-red-500">Budget should be greater &1000</p>
        ) : (
          ""
        )} */}

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
                <div className="bg-[white] flex items-center px-1 gap-1">
                  <span className="bg-[white]">$</span>
                  <input
                    type="number"
                    min="1000"
                    value={charges[platform]}
                    onChange={(e) =>
                      handleChargeChange(platform, e.target.value)
                    }
                    className="border-none p-2 w-full pl-3"
                    placeholder="1000"
                    required
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {error ? "value should be greater te" : ""} */}

      {/* <div className="flex justify-between items-center mb-4">
        <span className="text-[24px] font-semibold">Total ads budget</span>
        <span className="text-[24px] font-semibold">${totalcosdt}</span>
      </div> */}
      {/* <div className="flex justify-between flexcol items-start mb-4  opacity-85 italic">
        <span className="text-[16px] font-normal">
          Set Up Fee For New Accounts
        </span>
        <span className="text-[16px] bg font-normal"> $1500</span>
      </div> */}

      <div className="flex justify-between flexcol items-start mb-4">
        <span className="text-[16px] font-semibold">Base Management Fee</span>
        <span className="text-[16px] font-semibold">
          {baseManagementFee !== "Custom Quote"
            ? `$${baseManagementFee}`
            : baseManagementFee}
        </span>
      </div>
      <div className="flex justify-between flexcol items-start mb-4">
        <span className="text-[16px] font-semibold">Ad Running Fee</span>
        <span className="text-[16px] font-semibold">
          {/* {adRunningFeePercentage}--- */}
          {/* {(adRunningFeePercentage / 100).toFixed(2) * totalcosdt} */}
          {finalpercent.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between flexcol items-start mb-4">
        {/* <span className="text-[16px] font-semibold">Overall Fee</span> */}

        {/* {error ? (
          <p className="text-red-500">Budget should be greater &1000</p>
        ) : (
          <span className="text-[16px] font-semibold">
            {typeof overallCost === "number"
              ? `$${overallCost.toFixed(2)}`
              : overallCost.toLocaleString()}
          </span>
        )} */}
      </div>

      <div className="flex justify-between flexcol items-start mb-4">
        <span className="text-[24px] font-semibold">Total </span>
        <span className="text-[24px] font-semibold">
          {/* {(Number(overallCost) + Number(totalcosdt)).toLocaleString()} */}$
          {(Number(baseManagementFee) + Number(finalpercent)).toLocaleString()}
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

export default PaidAds;

// <div class="first-row" style="width:100%;float:left;">
// <label style="padding-bottom:10px;font-family: 'Plus Jakarta Sans';
//     font-weight: 400;
//     font-size: 12px;
//     line-height: 18px;color:#00444D;">Enter your name*</label>
// [text* text-454 placeholder "Enter your name"]
// </div>
// <div class="first-row" style="width:100%;float:left;">
// <label style="padding-bottom:10px;font-family: 'Plus Jakarta Sans';
//     font-weight: 400;
//     font-size: 12px;
//     line-height: 18px;">Enter your email*</label>
// [email* email-527 placeholder "Enter your email"]
// </div>
// <div class="first-row selecty" style="width:100%;float:left; margin-top:20px">
// <label style="padding-bottom:20px;font-family: 'Plus Jakarta Sans';
//     font-weight: 400;
// margin-bottom:10px;
//     font-size: 12px;
//     line-height: 18px;">What are you interested in?* </label>
// [checkbox* checkbox-82 use_label_element "Getting certified" "Enrolling in a class" "Attending a webinar"]
// </div>

// <div class="botton-roww">
// [submit "Chat with representative"]
// </div>

// 1 home page
// 2. certification page;
// 3.
