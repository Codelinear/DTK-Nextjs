import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setServiceCharge } from "../../redux/action/serviceSlice";
import {
  setStoredData,
  getStoredData,
  clearLocalStorageOnRefresh,
} from "../../utils/storageUtils";

const OrganicSocialMedia = ({ nextService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  const chargeNames = [
    "Facebook",
    "Instagram",
    "TikTok",
    "Reddit",
    "X (Twitter)",
    "Snapchat",
    "LinkedIn",
    "Pinterest",
  ];

  const getInitialCharges = () => {
    const savedCharges = getStoredData("OrganicSocialMedia");
    if (savedCharges) {
      return savedCharges;
    } else {
      return chargeNames.reduce((acc, name) => {
        acc[name] = serviceCharges[name] || "";
        return acc;
      }, {});
    }
  };

  const getInitialCounters = () => {
    const savedCounters = getStoredData("OrganicSocialMediaCounters");
    if (savedCounters) {
      return savedCounters;
    } else {
      return chargeNames.reduce((acc, name) => {
        acc[name] = 0;
        return acc;
      }, {});
    }
  };

  const [charges, setCharges] = useState(getInitialCharges);
  const [counters, setCounters] = useState(getInitialCounters);

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
      setCounters(
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
    setStoredData("OrganicSocialMedia", charges);
    setStoredData("OrganicSocialMediaCounters", counters);
  }, [charges, counters]);

  const calculateCounter = (updatedCharges) => {
    const platforms = Object.keys(updatedCharges).filter(
      (platform) => updatedCharges[platform].trim() !== ""
    );

    let counterValues = {};

    platforms.forEach((platform) => {
      const countValue = Number(updatedCharges[platform]) || 0;
      switch (platform) {
        case "Facebook":
          counterValues[platform] =
            countValue >= 2 ? 2.61 * updatedCharges[platform] : 4.35;
          break;
        case "Instagram":
          counterValues[platform] =
            countValue >= 2 ? 2.61 * updatedCharges[platform] : 4.35;
          break;
        case "Reddit":
          counterValues[platform] =
            countValue >= 2 ? 2.61 * updatedCharges[platform] : 4.35;
          break;
        case "X (Twitter)":
          counterValues[platform] =
            countValue >= 2 ? 2.61 * updatedCharges[platform] : 4.35;
          break;
        case "LinkedIn":
          counterValues[platform] =
            countValue >= 2 ? 2.61 * updatedCharges[platform] : 4.35;
          break;
        case "Pinterest":
          counterValues[platform] =
            countValue >= 2 ? 2.61 * updatedCharges[platform] : 4.35;
          break;
        case "TikTok":
          counterValues[platform] =
            countValue >= 2 ? 3.48 * updatedCharges[platform] : 5.4375;
          break;
        case "Snapchat":
          counterValues[platform] =
            countValue >= 2 ? 3.48 * updatedCharges[platform] : 5.4375;
          break;
        default:
          counterValues[platform] = 0;
          break;
      }
    });

    return counterValues;
  };

  // const calculatePlatformCost = (platform, postsPerWeek) => {
  //   const hoursPerMonth = postsPerWeek >= 2 ? 4.35 : 2.61;
  //   // const hoursPerMonth = 4.35;
  //   const hourlyRate = 150;

  //   switch (platform) {
  //     case "TikTok":
  //     case "Snapchat":
  //       return postsPerWeek === 1
  //         ? (5.4375 * hourlyRate).toFixed(2)
  //         : (3.48 * hourlyRate).toFixed(2);
  //     case "Facebook":
  //       return postsPerWeek >= 2
  //         ? (2.61 * hourlyRate).toFixed(2)
  //         : (4.35 * hourlyRate).toFixed(2);
  //     default:
  //       return (hoursPerMonth * hourlyRate).toFixed(2);
  //   }
  // };

  const calculatePlatformCost = (platform, postsPerWeek) => {
    const hourlyRate = 150;
    if (!postsPerWeek || postsPerWeek <= 0) {
      return "0.00"; // Return 0 when there are no posts
    }

    let hoursPerMonth;

    if (postsPerWeek >= 2) {
      switch (platform) {
        case "TikTok":
        case "Snapchat":
          hoursPerMonth = 3.48 * postsPerWeek; // Use reduced hours per post for 2+ posts per week
          break;
        case "Facebook":
        case "Instagram":
        case "Reddit":
        case "X (Twitter)":
        case "LinkedIn":
        case "Pinterest":
          hoursPerMonth = 2.61 * postsPerWeek; // Use reduced hours per post for 2+ posts per week
          break;
        default:
          hoursPerMonth = 2.61 * postsPerWeek;
          break;
      }
    } else {
      switch (platform) {
        case "TikTok":
        case "Snapchat":
          hoursPerMonth = 5.4375; // Use higher hours for a single post per week
          break;
        case "Facebook":
        case "Instagram":
        case "Reddit":
        case "X (Twitter)":
        case "LinkedIn":
        case "Pinterest":
          hoursPerMonth = 4.35; // Use higher hours for a single post per week
          break;
        default:
          hoursPerMonth = 4.35;
          break;
      }
    }

    return (hoursPerMonth * hourlyRate).toFixed(2);
  };

  // const totalcost1 = 4.35 * 150;
  // const calculateTotalCounter = () => {
  //   let totalCounter = 0;

  //   const platforms = Object.keys(counters).filter(
  //     (platform) => charges[platform].trim() !== ""
  //   );

  //   platforms.forEach((platform) => {
  //     const postsPerWeek = Number(charges[platform]) || 0;
  //     const costPerPost = calculatePlatformCost(platform, postsPerWeek);
  //     totalCounter += postsPerWeek * costPerPost;
  //   });

  //   return totalCounter.toFixed(2);
  // };

  const calculateTotalCounter = () => {
    let totalCost = 0;

    const platforms = Object.keys(charges).filter(
      (platform) => charges[platform].trim() !== ""
    );

    platforms.forEach((platform) => {
      const postsPerWeek = Number(charges[platform]) || 0;
      const costPerPost = calculatePlatformCost(platform, postsPerWeek);
      totalCost += Number(costPerPost); // Accumulate the cost
    });

    return totalCost.toFixed(2); // Return the total cost as a string with two decimal places
  };
  const handleNext = () => {
    if (nextService) {
      router.push(`/services/${nextService}`);
    } else {
      router.push("/summary");
    }
  };

  // const handleChargeChange = (platform, value) => {
  //   const updatedCharges = { ...charges, [platform]: value };
  //   const updatedCounters = calculateCounter(updatedCharges);

  //   const chargesToStore = Object.fromEntries(
  //     Object.entries(updatedCharges).filter(
  //       ([_, amount]) => amount.trim() !== ""
  //     )
  //   );

  //   setCharges(updatedCharges);
  //   setCounters(updatedCounters);
  //   dispatch(
  //     setServiceCharge({
  //       serviceId: "6",
  //       charges: chargesToStore,
  //       ServiceName: "Organic Social Media",
  //     })
  //   );
  // };

  const handleChargeChange = (platform, value) => {
    const updatedCharges = { ...charges, [platform]: value };
    const updatedCounters = calculateCounter(updatedCharges);

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(
        ([_, amount]) => amount.trim() !== ""
      )
    );

    // Calculate the total cost across all platforms correctly
    const serviceTotal = Object.keys(updatedCharges)
      .filter((key) => updatedCharges[key].trim() !== "")
      .reduce((total, key) => {
        const postsPerWeek = Number(updatedCharges[key]) || 0;
        const platformCost = parseFloat(
          calculatePlatformCost(key, postsPerWeek)
        );
        return total + platformCost; // Add the platform's calculated cost directly
      }, 0);

    setCharges(updatedCharges);
    setCounters(updatedCounters);

    // Dispatch with the total charges included
    dispatch(
      setServiceCharge({
        serviceId: "6",
        charges: chargesToStore,
        ServiceName: "Organic Social Media",
        totalCharges: serviceTotal.toFixed(2), // Ensure the total is formatted to two decimal places
      })
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-[28px] font-bold mb-4">
        Organic Social Media - Add deliverables
      </h1>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left text-[14px] font-normal p-2">Platforms</th>
            <th className="text-left text-[14px] font-normal p-2">
              Number of Posts (Weekly)
            </th>
            {/* <th className="text-left text-[14px] font-normal p-2">
              No. of hours(Monthly)
            </th>
            <th className="text-left text-[14px] font-normal w-[250px] p-2">
              Cost
            </th> */}
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
                <div className="bg-[white] flex items-center px-1 gap-1">
                  {/* <span className="bg-[white]">$</span> */}
                  <input
                    type="number"
                    min="0"
                    value={charges[platform]}
                    onChange={(e) =>
                      handleChargeChange(platform, e.target.value)
                    }
                    className="border-none p-2 w-full pl-3"
                    placeholder="100"
                  />
                </div>
              </td>
              {/* <td className="p-2 h-[20px] my-3 w-[230px] bgwhite">
                <input
                  type="number"
                  min="0"
                  value={counters[platform]}
                  readOnly
                  className="border-none p-2 w-full text-center"
                  placeholder="Counter"
                />
              </td> */}
              {/* <td className="p-2 h-[20px] my-3 w-[330px] bgwhite">
                <input
                  type="number"
                  min="0"
                  value={calculatePlatformCost(platform, charges[platform])}
                  readOnly
                  className="border-none p-2 text-center w-[250px]"
                  placeholder="0"
                />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">Total cost Per month</span>
        <span className="text-[24px] font-semibold">
          {calculateTotalCounter().toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        {/* <span className="text-sm">Total counter</span> */}
      </div>

      <div className="flex justify-start gap-5">
        <button
          onClick={() => navigate(-1)}
          className="bg-[white] border border-[#000] rounded-lg px-4 py-2 hover:bg-gray-200 transition"
        >
          Back
        </button>
        <button
          // onClick={() => nextService("OrganicSocialMedia")}
          onClick={handleNext}
          className="bg-[#009FF5] text-[white] rounded-lg px-4 py-2 hover:bg-gray-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrganicSocialMedia;
