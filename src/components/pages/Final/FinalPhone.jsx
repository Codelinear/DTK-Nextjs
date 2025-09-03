// src/components/Final.js
import React from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf"; // For PDF generation
import Link from "next/link";

const FinalPhone = () => {
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  // console.log(serviceCharges);

  const totalCharge = Object.values(serviceCharges).reduce(
    (acc, charges) =>
      acc +
      Object.values(charges).reduce(
        (sum, amount) => sum + (Number(amount) || 0),
        0
      ),
    0
  );
  // Calculate price ranges
  const underchargingMin = totalCharge * 0.44;
  const underchargingMax = totalCharge * 0.8333;
  const averagePriceMin = totalCharge * 0.8334;
  const averagePriceMax = totalCharge * 1.1666;
  const overchargingMin = totalCharge * 1.1667;
  const overchargingMax = totalCharge * 1.44;

  // Assuming average price is within the calculated average range
  const averagePrice = Math.min(
    Math.min(totalCharge, averagePriceMin),
    averagePriceMax
  );

  // Function to handle the download report action
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Price Estimation Report:`, 10, 10);
    doc.text(
      `Undercharging Range: $${underchargingMin.toFixed(
        2
      )} - $${underchargingMax.toFixed(2)}`,
      10,
      20
    );
    doc.text(`Average Price: $${averagePrice.toFixed(2)}`, 10, 30);
    doc.text(
      `Overcharging Range: $${overchargingMin.toFixed(
        2
      )} - $${overchargingMax.toFixed(2)}`,
      10,
      40
    );
    doc.save("report.pdf");
  };

  // Function to calculate the indicator position
  const calculateIndicatorPosition = () => {
    const range = overchargingMax - underchargingMin;
    const position = ((averagePrice - underchargingMin) / range) * 100;
    return `${position}%`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link className="font-bold flex gap-2 items-center mb-8" href="/">
        <div className="bg-[#A9DCF7] rounded-full p-2">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.983 19.5V14.5H14.983V19.5C14.983 20.05 15.433 20.5 15.983 20.5H18.983C19.533 20.5 19.983 20.05 19.983 19.5V12.5H21.683C22.143 12.5 22.363 11.93 22.013 11.63L13.653 4.1C13.273 3.76 12.693 3.76 12.313 4.1L3.95301 11.63C3.61301 11.93 3.82301 12.5 4.28301 12.5H5.98301V19.5C5.98301 20.05 6.43301 20.5 6.98301 20.5H9.98301C10.533 20.5 10.983 20.05 10.983 19.5Z"
              fill="#001926"
            />
          </svg>
        </div>
        Go back
      </Link>
      <h1 className="text-2xl font-bold text-center mb-4">
        Here's what an agency would charge you.
      </h1>
      <p className="text-center mb-4">
        These are just an estimate. Prices may vary.
      </p>

      <div className="flex justify-between items-center space-x- p-4 b100 rounded-md gap-10 max-md:flex-col w-[60%] ml-20">
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-start relative w-full">
          <div className="text-gray-600">Undercharging</div>
          <div className="text-black font-bold text-lg">
            {/* ${underchargingMin.toFixed(2)} - ${underchargingMax.toFixed(2)} */}
            ${underchargingMin.toFixed(2)}
          </div>
          <div className="absolute bottom-8 left-0 rotate-90 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#fff]"></div>
        </div>

        <div className="bg-[#009FF5] p-4 rounded-md shadow-md flex flex-col items-start text-white relative w-full scale-110">
          <div className="text-lg">Average Price</div>
          <div className="font-bold text-left text-xl">
            ${averagePrice.toFixed(2)}
          </div>
          <div className="absolute bottom-8 left-0 rotate-90 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#009FF5]"></div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-start relative w-full">
          <div className="text-gray-600">Overcharging</div>
          <div className="text-black font-bold text-lg">
            ${overchargingMin.toFixed(2)}
            {/* ${overchargingMin.toFixed(2)} - ${overchargingMax.toFixed(2)} */}
          </div>
          <div className="absolute bottom-8 left-0 rotate-90 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#fff]"></div>
        </div>
      </div>
      <div className="relative h-32 rounded mb-6 max-md: -mt-40">
        <div
          className="absolute left-0 max-md:-left-[40%] max-md:-top-[40%] h-16 bg-gradient-to-r from-[#78C1CB] via-[#7FDF88] to-[#E55426] rounded w-full max-md:rotate-90"
          // style={{ width: "100%" }}
        ></div>
        <div
          className="absolute top-0 h-8 w-2 bg-[#009FF5] rounded transform -translate-y-2 max-md:hidden"
          style={{ left: calculateIndicatorPosition() }}
        ></div>
      </div>

      <div className="flex justify-between mt4 space-x- mt-20 flex-col gap-10">
        <div className="flex justify-between mt4 space-x-4 mt20 ">
          <button
            className="bg-[white] text-[#006296] border-[#006296] border-2 px-4 py-2 rounded"
            // onClick={() => console.log("Edit Services")}
          >
            Edit Services
          </button>
          <button className="bg-[white] text-[#006296] border-[#006296] border-2 px-4 py-2 rounded">
            View Price Breakdown
          </button>
        </div>

        <button
          className="px-4 py-2 bg-[#009FF5] text-white rounded hover:bg-blue-700"
          onClick={handleDownload}
        >
          Download Report
        </button>
      </div>
    </div>
  );
};
export default FinalPhone;
