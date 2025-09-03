// // src/components/services/PaidSocial.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { setServiceCharge } from "../../redux/action/serviceSlice";
// // import { setServiceCharge } from "../../servicesSlice";

// const PaidSocial = ({ nextService }) => {
//   const dispatch = useDispatch();
//    const router = useRouter();
//   const serviceCharges = useSelector((state) => state.services.serviceCharges);

//   const { serviceChargesss } = useSelector((state) => state.services);
//   console.log(serviceChargesss);

//   const [charges, setCharges] = useState({
//     "Meta (FB and/or Insta)": serviceCharges["Meta (FB and/or Insta)"] || "",
//     "TikTok	": serviceCharges["TikTok	"] || "",
//     Reddit: serviceCharges["Reddit"] || "",
//     "X (Twitter)": serviceCharges["X (Twitter)"] || "",
//     Snapchat: serviceCharges["Snapchat"] || "",
//     LinkedIn: serviceCharges["LinkedIn"] || "",
//   });

//   Object.entries(serviceCharges).forEach(([serviceId, charges]) => {
//     Object.entries(charges).forEach(([chargeName, amount]) => {
//       console.log(amount);
//     });
//   });

//   const totalCharge = Object.values(charges).reduce(
//     (acc, charge) => acc + (Number(charge) || 0),
//     0
//   );

//   const handleChargeChange = (platform, value) => {
//     // Update local state with the new value
//     const updatedCharges = { ...charges, [platform]: value };

//     // Filter out entries with empty values, but keep all entries in local state
//     const chargesToStore = Object.fromEntries(
//       Object.entries(updatedCharges).filter(
//         ([_, amount]) => amount.trim() !== ""
//       )
//     );

//     setCharges(updatedCharges);
//     dispatch(
//       setServiceCharge({
//         serviceId: "1",
//         charges: chargesToStore,
//         ServiceName: " Paid Social",
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
//         Paid Social - Add average monthly budget
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
//                 <td className="p-2 w-[170px] flex">
//                   {/* $ */}
//                   {console.log(charges[platform])}
//                   <input
//                     type="number"
min = "0";
//                     value={charges[platform]}
//                     onChange={(e) =>
//                       handleChargeChange(platform, e.target.value)
//                     }
//                     className="border-none p-2 w-full ml-3"
//                     placeholder="100"
//                   />
//                 </td>
//               </tr>
//             </>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-between items-center mb-4">
//         <span className="text-[24px] font-semibold">Total cost</span>
//         <span className="text-[24px] font-semibold">${totalCharge}</span>
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

// export default PaidSocial;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setServiceCharge } from "../../redux/action/serviceSlice";
import {
  setStoredData,
  getStoredData,
  clearLocalStorageOnRefresh,
} from "../../utils/storageUtils";

const PaidSocial = ({ nextService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  const chargeNames = [
    "Meta (FB and/or Insta)",
    "TikTok",
    "Reddit",
    "X (Twitter)",
    "Snapchat",
    "LinkedIn",
  ];

  const getInitialCharges = () => {
    const savedCharges = getStoredData("paidSocialCharges");
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
    setStoredData("paidSocialCharges", charges);
  }, [charges]);

  const handleChargeChange = (platform, value) => {
    const updatedCharges = { ...charges, [platform]: value };

    const chargesToStore = Object.fromEntries(
      Object.entries(updatedCharges).filter(
        ([_, amount]) => amount.trim() !== ""
      )
    );

    setCharges(updatedCharges);
    dispatch(
      setServiceCharge({
        serviceId: "1",
        charges: chargesToStore,
        ServiceName: "Paid Social",
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

  const totalCharge = Object.values(charges).reduce(
    (acc, charge) => acc + (Number(charge) || 0),
    0
  );

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-[28px] font-bold mb-4">
        Paid Social - Add average monthly budget
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
        <tbody>
          {chargeNames.map((platform) => (
            <tr
              key={platform}
              className="border-b-[1px] border-opacity-20 border-[#000]"
            >
              <td className="p-2 font-semibold text-[18px] w-full">
                {platform}
              </td>
              <td className="p-2 w-[170px] flex">
                <input
                  type="number"
                  min="0"
                  value={charges[platform]}
                  onChange={(e) => handleChargeChange(platform, e.target.value)}
                  className="border-none p-2 w-full ml-3"
                  placeholder="100"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[24px] font-semibold">Total cost</span>
        <span className="text-[24px] font-semibold">${totalCharge}</span>
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
