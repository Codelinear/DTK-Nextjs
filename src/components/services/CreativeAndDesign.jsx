// // src/components/services/PaidSocial.js
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { setServiceCharge } from "../../redux/action/serviceSlice";
// // import { setServiceCharge } from "../../servicesSlice";

// const CreativeAndDesign = ({ nextService }) => {
//   const dispatch = useDispatch();
//    const router = useRouter();
//   const serviceCharges = useSelector((state) => state.services.serviceCharges);
//   const [charges, setCharges] = useState({
//     Graphics: serviceCharges["Graphics"] || "",
//     Infographics: serviceCharges["Infographics"] || "",
//     Brochures: serviceCharges["Brochures"] || "",
//     Videos: serviceCharges["Videos"] || "",
//     "Stock Photos": serviceCharges["Stock Photos"] || "",
//   });

//   const handleChargeChange = (platform, value) => {
//     // Update local state with the new value
//     const updatedCharges = { ...charges, [platform]: value };

//     // Filter out entries with empty values, but keep all entries in local state
//     const chargesToStore = Object.fromEntries(
//       Object.entries(updatedCharges).filter(
//         ([_, amount]) => amount.trim() !== ""
//       )
//     );

//     setCharges(updatedCharges); // Update local state with all charges

//     // Dispatch only fields with non-empty values
//     dispatch(
//       setServiceCharge({
//         serviceId: "8",
//         charges: chargesToStore,
//         ServiceName: "Creative and Design",
//       })
//     );
//   };

//   const handleNext = () => {
//     if (nextService) {
//       router.push(`/services/${nextService}`);
//     } else {
//       router.push("/summary");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-2xl">
//       <h1 className="text-[28px] font-bold mb-4">
//         Creative and Design - Add deliverables
//       </h1>
//       <table className="w-full mb-4">
//         <thead>
//           <tr>
//             <th className="text-left text-[14px] font-normal p-2">Platforms</th>
//             <th className="text-left text-[14px] font-normal p-2">
//               Average monthly budget
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(charges).map((platform) => (
//             <>
//               <tr
//                 key={platform}
//                 className="border-b-[1px] border-opacity-20 border-[#000]"
//               >
//                 <td className="p-2 font-semibold text-[18px] w-full">
//                   {platform}
//                 </td>
//                 <td className="p-2 w-[170px] flex bgwhite items-center ">
//                   <div className="bg-[white] flex items-center px-1 gap-1">
//                     <span className="bg-[white]">$</span>
//                     <input
//                       type="number"
//                       min="0"
//                       value={charges[platform]}
//                       onChange={(e) =>
//                         handleChargeChange(platform, e.target.value)
//                       }
//                       className="border-none p-2 w-full pl-3"
//                       placeholder="100"
//                     />
//                   </div>
//                 </td>
//               </tr>
//             </>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-between items-center mb-4">
//         <span className="text-[24px] font-semibold">Total cost</span>
//         <span className="text-[24px] font-semibold">
//           $
//           {Object.values(charges)
//             .reduce((acc, charge) => acc + (Number(charge) || 0), 0)
//             .toFixed(2)}
//         </span>
//       </div>
//       <div className="flex justify-start gap-5">
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-[white] text-[#006296] border-[#006296] border-2 px-4 py-2 rounded"
//         >
//           Go back
//         </button>
//         <button
//           onClick={handleNext}
//           className="bg-[#009FF5] text-white px-4 py-2 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreativeAndDesign;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setServiceCharge } from "../../redux/action/serviceSlice";
import {
  setStoredData,
  getStoredData,
  clearLocalStorageOnRefresh,
} from "../../utils/storageUtils";

const CreativeAndDesign = ({ nextService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  // Define platform-specific costs
  const platformCosts = {
    Graphics: 150,
    Infographics: 400,
    Brochures: 800,
    Videos: 400,
    "Stock Photos": 50,
  };

  const chargeNames = [
    "Graphics",
    "Infographics",
    "Brochures",
    "Videos",
    "Stock Photos",
  ];

  const getInitialCharges = () => {
    const savedCharges = getStoredData("Creative and Design");
    if (savedCharges) {
      return savedCharges;
    } else {
      return chargeNames.reduce((acc, name) => {
        acc[name] = serviceCharges[name] || 0;
        return acc;
      }, {});
    }
  };

  // const [charges, setCharges] = useState();
  const [charges, setCharges] = useState(getInitialCharges);

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
    setStoredData("Creative and Design", charges);
  }, [charges]);

  const handleChargeChange = (platform, value) => {
    const updatedCharges = { ...charges, [platform]: Number(value) };

    // Filter out entries with empty values
    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(([_, amount]) => amount)
    );

    // Calculate total charges based on platform-specific costs
    const serviceTotal = Object.keys(updatedCharges).reduce(
      (acc, platform) =>
        acc + (updatedCharges[platform] * platformCosts[platform] || 0),
      0
    );

    setCharges(updatedCharges);

    // Dispatch the updated charges and total cost
    dispatch(
      setServiceCharge({
        serviceId: "8",
        charges: chargesToStore,
        ServiceName: "Creative and Design",
        totalCharges: serviceTotal,
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

  // Calculate total cost
  const totalCost = Object.keys(charges).reduce(
    (acc, platform) => acc + (charges[platform] * platformCosts[platform] || 0),
    0
  );

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-[28px] font-bold mb-4">
        Creative and Design - Add deliverables
      </h1>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left text-[14px] font-normal p-2">Platforms</th>
            <th className="text-left text-[14px] font-normal p-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(charges).map((platform) => (
            <tr
              key={platform}
              className="border-b-[1px] border-opacity-20 border-[#000]"
            >
              <td className="p-2 font-semibold text-[18px] w-full">
                {platform}
              </td>
              <td className="p-2 w-[170px] flex bgwhite items-center">
                <input
                  type="number"
                  min="0"
                  value={charges[platform]}
                  onChange={(e) => handleChargeChange(platform, e.target.value)}
                  className="border-none p-2 w-full pl-3"
                  placeholder="0"
                />
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

export default CreativeAndDesign;
