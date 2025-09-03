// // src/components/services/DigitalPR.js
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { setServiceCharge } from "../../redux/action/serviceSlice";
// // import { setServiceCharge } from "../../servicesSlice";

// const CustomInput = ({ value, OnChange }) => {
//   const handleIncrement = () => {
//     OnChange(value + 1);
//   };

//   const handleDecrement = () => {
//     OnChange(value > 0 ? value - 1 : 0); // Ensure the value doesn't go below 0
//   };

//   return (
//     <div className="flex items-center border px-2 w-full bg-[#fff]">
//       <button
//         onClick={handleDecrement}
//         className="px-3 text-[25px]  font-bold border-r-2 border-opacity-20 border-black"
//       >
//         -
//       </button>
//       <input
//         type="number"
//         min="0"
//         value={value}
//         onChange={(e) => OnChange(Number(e.target.value))}
//         className="border-none text-center w-full py-3"
//         placeholder="100"
//       />
//       <button
//         onClick={handleIncrement}
//         className="px-3 text-[25px]  font-bold border-l-2 border-opacity-20  border-black"
//       >
//         +
//       </button>
//     </div>
//   );
// };
// const DigitalPR = ({ nextService }) => {
//   const dispatch = useDispatch();
//    const router = useRouter();
//   const serviceCharges = useSelector((state) => state.services.serviceCharges);
//   const [charges, setCharges] = useState({
//     Backlinks: serviceCharges["Backlinks"] || 0,
//   });
//   const [isDropdownActive, setIsDropdownActive] = useState(false);

//   const handleChargeChange = (platform, value) => {
//     // Update local state with the new value
//     const updatedCharges = { ...charges, [platform]: Number(value) };

//     const chargesToStore = Object.fromEntries(
//       Object.entries(updatedCharges).filter(([_, amount]) => amount)
//     );

//     const serviceTotal = isDropdownActive
//       ? Object.entries(updatedCharges).reduce(
//           (sum, [name, value]) => sum + Number(value) * 500,
//           0
//         )
//       : Object.entries(updatedCharges).reduce((sum, [name, hours]) => {
//           // const rate = name === "Blogs" ? 400 : 300; // Different rate for Blogs
//           return sum + hours * 100;
//         }, 0);
//     setCharges(updatedCharges); // Update local state with all charges
//     // Dispatch only fields with non-empty values
//     dispatch(
//       setServiceCharge({
//         serviceId: "5",
//         charges: chargesToStore,
//         ServiceName: "Digital PR",
//         totalCharges: serviceTotal,
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
//   const totalCost = !isDropdownActive
//     ? Object.entries(charges).reduce(
//         (acc, [platform, charge]) => acc + Number(charge) * 500,
//         0
//       )
//     : Object.entries(charges).reduce((acc, [platform, charge]) => {
//         // const rate = platform === "Blogs" ? 400 : 300; // Different rate for Blogs
//         return acc + Number(charge) * 100;
//       }, 0);
//   return (
//     <div className="container mx-auto p-4 max-w-2xl">
//       <h1 className="text-[28px] font-bold mb-4">
//         Digital PR - Add average monthly budget
//       </h1>
//       <div className="mb-4 flex items-center">
//         <label className="mr-4">Calculate by hours spent</label>
//         <button
//           onClick={() => setIsDropdownActive((prev) => !prev)}
//           className={`w-12 h-6 flex items-center bg-gray00 rounded-full p-1 cursor-pointer transition-colors ${
//             isDropdownActive ? "bg-[#013958]" : "bg-gray-300"
//           }`}
//         >
//           <div
//             className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
//               isDropdownActive ? "translate-x-6" : ""
//             }`}
//           ></div>
//         </button>
//       </div>
//       <table className="w-full mb-4">
//         <thead>
//           <tr>
//             <th className="text-left text-[14px] font-normal p-2">Platforms</th>
//             <th className="text-left text-[14px] font-normal p-2">
//               {!isDropdownActive ? "Number of Backlinks" : "Number of Hours"}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(charges).map((platform) => (
//             <tr
//               key={platform}
//               className="border-b-[1px] border-opacity-20 border-[#000]"
//             >
//               <td className="p-2 font-semibold text-[18px] w-full">
//                 {platform}
//               </td>
//               <td className="p-2 w-[170px] flex bgwhite items-center ">
//                 {isDropdownActive ? (
//                   <CustomInput
//                     value={charges[platform] + 4}
//                     OnChange={(value) => handleChargeChange(platform, value)}
//                   />
//                 ) : (
//                   <input
//                     type="number"
//                     min="0"
//                     value={charges[platform]}
//                     onChange={(e) =>
//                       handleChargeChange(platform, e.target.value)
//                     }
//                     className="border-none p-2 w-full ml-3"
//                     placeholder="100"
//                   />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-between items-center mb-4">
//         <span className="text-[24px] font-semibold">Total cost</span>
//         <span className="text-[24px] font-semibold">
//           $ {totalCost.toLocaleString()}
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

// export default DigitalPR;

// src/components/services/DigitalPR.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setServiceCharge } from "../../redux/action/serviceSlice";

const CustomInput = ({ value, onChange, step = 1 }) => {
  const handleIncrement = () => {
    onChange(value + step);
  };

  const handleDecrement = () => {
    onChange(value - step >= 0 ? value - step : 0);
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
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
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

const DigitalPR = ({ nextService }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  // Store both backlinks and hours
  const [charges, setCharges] = useState({
    Backlinks: serviceCharges["Backlinks"] || 0,
    Hours: (serviceCharges["Backlinks"] || 0) * 5,
  });

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  // Sync backlinks ↔ hours
  const handleBacklinkChange = (value) => {
    const backlinks = value >= 0 ? value : 0;
    const hours = backlinks * 5;

    setCharges({ Backlinks: backlinks, Hours: hours });
    dispatchService(backlinks, hours);
  };

  const handleHourChange = (value) => {
    const hours = value >= 0 ? value : 0;
    const backlinks = Math.floor(hours / 5); // keep backlinks in sync

    setCharges({ Backlinks: backlinks, Hours: hours });
    dispatchService(backlinks, hours);
  };

  // dispatch unified service charge
  const dispatchService = (backlinks, hours) => {
    const serviceTotal = backlinks * 500; // cost is same base

    dispatch(
      setServiceCharge({
        serviceId: "5",
        charges: { Backlinks: backlinks, Hours: hours },
        ServiceName: "Digital PR",
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

  const totalCost = charges.Backlinks * 500; // 1 backlink = $500

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-[28px] font-bold mb-4">
        Digital PR - Add average monthly budget
      </h1>
      <div className="mb-4 flex items-center">
        <label className="mr-4">Calculate by hours spent</label>
        <button
          onClick={() => setIsDropdownActive((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            isDropdownActive ? "bg-[#013958]" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isDropdownActive ? "translate-x-6" : ""
            }`}
          ></div>
        </button>
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left text-[14px] font-normal p-2">Platforms</th>
            <th className="text-left text-[14px] font-normal p-2">
              {!isDropdownActive ? "Number of Backlinks" : "Number of Hours"}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-[1px] border-opacity-20 border-[#000]">
            <td className="p-2 font-semibold text-[18px] w-full">Backlinks</td>
            <td className="p-2 w-[170px] flex items-center">
              {!isDropdownActive ? (
                <CustomInput
                  value={charges.Backlinks}
                  onChange={handleBacklinkChange}
                  step={1}
                />
              ) : (
                <CustomInput
                  value={charges.Hours}
                  onChange={handleHourChange}
                  step={5}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[24px] font-semibold">Total cost</span>
        <span className="text-[24px] font-semibold">
          $ {totalCost.toLocaleString()}
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

export default DigitalPR;
