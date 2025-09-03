// export default AmazonMarketing;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setServiceCharge } from "../../redux/action/serviceSlice";

const PaidSocial = ({ nextService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  const [amazonCharges, setAmazonCharges] = useState({
    Paid: serviceCharges["Paid"] || "",
  });
  const [data, setdata] = useState();
  const handleAmazonChargeChange = (platform, value) => {
    const updatedCharges = { ...amazonCharges, [platform]: value };

    setAmazonCharges(updatedCharges);

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(
        ([_, amount]) => amount.trim() !== ""
      )
    );
    setdata(chargesToStore);
  };

  const amazonTotal = Object.values(amazonCharges)
    .reduce((acc, charge) => acc + (Number(charge) || 0), 0)
    .toFixed(2);

  const [page, setPage] = useState(0);
  const [cost, setCost] = useState(0);
  const [fee, setFee] = useState(0);
  const [management, setManagement] = useState(0);
  const handlePageChange = (e) => {
    const pageValue = Number(e.target.value);
    // console.log(pageValue);
    setPage(pageValue);

    // Calculate the cost based on the number of pages
    setCost(pageValue * 500);

    // Determine the management fee based on the number of pages
    if (pageValue <= 5 && pageValue > 0) {
      setFee(500);
      setManagement(500);
    } else if (pageValue >= 6 && pageValue <= 20) {
      setFee(1000);
      setManagement(1000);
    } else if (pageValue > 20) {
      setFee(1500);
      setManagement(1500);
    } else {
      setFee(0);
    }
  };

  // //////////////////////////////////////////////////////////////////////////////////////////////////////
  const getRangeDetails = (total) => {
    const ranges = [
      { min: 1, max: 14999, paidAdsOrSocial: 1500, percentage: 0.12 },
      { min: 15000, max: 29999, paidAdsOrSocial: 2000, percentage: 0.1 },
      // { min: 15000, max: 29999, paidAdsOrSocial: 2000, percentage: 0.09 },
      { min: 30000, max: 59999, paidAdsOrSocial: 2500, percentage: 0.09 },
      { min: 60000, max: 99999, paidAdsOrSocial: 3000, percentage: 0.08 },
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

  const totalcosdt = Object.values(amazonCharges)
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

  const gtotaol = Number(overallCost) + Number(totalcosdt) + cost + fee;

  const handleNext = () => {
    console.log("totalcosdt", totalcosdt);
    console.log("fee", fee);
    console.log("const", cost);
    console.log("gradntotal", gtotaol);
    console.log("final", finalpercent);
    console.log("diffrece", gtotaol - finalpercent);
    dispatch(
      setServiceCharge({
        serviceId: "7",
        charges: data,
        ServiceName: "Amazon Marketing",
        totalCharges: gtotaol - finalpercent - totalcosdt,
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
        Amazon Marketing - Add deliverables
      </h1>

      {/* Amazon Section */}
      <div className="mb-6">
        {/* <h2 className="text-[24px] font-semibold mb-4">Amazon Marketing</h2> */}
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="text-left text-[14px] font-normal p-2">
                Platforms
              </th>
              <th className="text-left text-[14px] font-normal p-2">
                Average monthly budget
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(amazonCharges).map((platform) => (
              <tr
                key={platform}
                className="border-b-[1px] border-opacity-20 border-[#000]"
              >
                <td className="p-2 font-semibold text-[18px] w-full">
                  {platform}
                </td>
                <td className="p-2 w-[170px] flex items-center">
                  <div className="bg-[white] flex items-center px-1 gap-1">
                    <span className="bg-[white]">$</span>
                    <input
                      type="number"
                      min="0"
                      value={amazonCharges[platform]}
                      onChange={(e) =>
                        handleAmazonChargeChange(platform, e.target.value)
                      }
                      className="border-none p-2 w-full pl-3"
                      placeholder="100"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" justify-between items-center mb-4">
          <div className="flex justify-between flexcol items-start mb-4">
            <span className="text-[16px] font-semibold">
              Base Management Fee
            </span>
            <span className="text-[16px] font-semibold">
              {baseManagementFee !== "Custom Quote"
                ? `$${baseManagementFee.toLocaleString()}`
                : baseManagementFee.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between flexcol items-start mb-4">
            <span className="text-[16px] font-semibold">Ad Running Fee</span>
            <span className="text-[16px] font-semibold">
              {/* {adRunningFeePercentage}--- */}
              {/* {(adRunningFeePercentage / 100).toFixed(2) * totalcosdt} */}$
              {finalpercent.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between flexcol items-start mb-4">
            <span className="text-[24px] font-semibold">Total </span>
            <span className="text-[24px] font-semibold">
              {Number(overallCost).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Organic Section */}

      <div className="mb-6 ">
        <div className=" justify-between">
          <h2 className="text-[24px] font-semibold mb-4">Organic Marketing</h2>
          <br />
          <div className="mb-4 flex justify-between gap-2">
            <h2 className="text-[16px] font-semibold mb-4">Organic</h2>

            <div className="flex gap-2">
              <div className="flex flex-col">
                <label>No. of pages</label>
                <input
                  type="number"
                  min="0"
                  value={Number(page)}
                  onChange={handlePageChange}
                  className="border bg-white p-2 w-[100px] pl-3"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-[20px] font-semibold">Organic Total Cost</span>
          <span className="text-[24px] font-semibold">
            $ {(cost + management).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Overall Total */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[24px] font-semibold">Overall Total Cost</span>
        <span className="text-[24px] font-semibold">
          {/* $ {Number(overallCost) + Number(totalcosdt) + cost + fee} */}${" "}
          {(Number(overallCost) + cost + fee).toLocaleString()}
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

export default PaidSocial;
