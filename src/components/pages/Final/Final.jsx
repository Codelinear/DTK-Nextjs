"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf"; // For PDF generation
import Link from "next/link";
import FinalPhone from "./FinalPhone";
import axios from "axios";
const Final = () => {
  const serviceCharges = useSelector((state) => state.services.serviceCharges);

  // console.log(serviceCharges);
  // Calculate total from Redux store
  // const totalCharge = Object.values(serviceCharges).reduce(
  //   (acc, charge) => acc + charge,
  //   0
  // );

  // const totalCharge = Object.values(serviceCharges).reduce(
  //   (acc, charges) =>
  //     acc +
  //     Object.values(charges).reduce(
  //       (sum, amount) => sum + (Number(amount) || 0),
  //       0
  //     ),
  //   0
  // );
  const totalCharge = Object.values(serviceCharges).reduce((total, service) => {
    const charges = parseFloat(service.totalCharges);
    return total + (isNaN(charges) ? 0 : charges);
  }, 0);

  // console.log(totalCharge);

  const totalChargesSum = Object.values(serviceCharges).reduce(
    (total, service) => {
      const charges = parseFloat(service.totalCharges);
      return total + (isNaN(charges) ? 0 : charges);
    },
    0
  );
  // console.log(totalCharge);
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
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [isSending, setIsSending] = useState(false); // To show loading state

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
    doc.text(`Our Cost: $${totalCharge}`, 10, 50);
    doc.text(`Email: GetStarted@TheDigitalToolKit.com`, 10, 60);

    const pdfBlob = doc.output("blob");
    // Create a FormData object to send PDF and email
    const formData = new FormData();
    formData.append("pdf", pdfBlob, "report.pdf");
    formData.append("email", email);

    setIsSending(true);

    // Send request to backend to send the email
    axios
      .post("http://localhost:5000/send-email", formData)
      .then((response) => {
        alert("Email sent successfully!");
        setShowModal(false); // Close the modal on success
        if (response.success) {
          alert("Email sent successfully!");
        }
        // console.log(response.message);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // alert("Failed to send email.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleDownload2 = () => {
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
    doc.text(`Our Cost: $${totalChargesSum}`, 10, 50);
    doc.text(`Email: GetStarted@TheDigitalToolKit.com`, 10, 60);

    doc.save("report.pdf");
  };

  // Function to calculate the indicator position
  const calculateIndicatorPosition = () => {
    const range = overchargingMax - underchargingMin;
    const position = ((averagePrice - underchargingMin) / range) * 100;
    return `${position}%`;
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-4 max-md:hidden">
        <Link
          className="font-bold flex gap-2 items-center mb-8"
          href="/summary"
        >
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

        <div className="flex justify-between items-center space-x- p-4 b100 rounded-md gap-10 max-md:flex-col">
          <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-start relative w-full">
            <div className="text-gray-600">Undercharging</div>
            <div className="text-black font-bold text-lg">
              {/* ${underchargingMin.toFixed(2)} - ${underchargingMax.toFixed(2)} */}
              ${underchargingMin.toFixed(2)}
            </div>
            <div className="absolute bottom-0 left-6 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#fff]"></div>
          </div>

          <div className="bg-[#009FF5] p-4 rounded-md shadow-md flex flex-col items-start text-white relative w-full scale-110">
            <div className="text-lg">Average Price</div>
            <div className="font-bold text-left text-xl">
              ${averagePrice.toFixed(2)}
            </div>
            <div className="absolute bottom-0 left-8 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#009FF5]"></div>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-start relative w-full">
            <div className="text-gray-600">Overcharging</div>
            <div className="text-black font-bold text-lg">
              ${overchargingMin.toFixed(2)}
              {/* ${overchargingMin.toFixed(2)} - ${overchargingMax.toFixed(2)} */}
            </div>
            <div className="absolute bottom-0 left-6 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#fff]"></div>
          </div>
        </div>
        <div className="relative bg-gray-200 h-10 rounded mb-6 max-md:hidd">
          <div
            className="absolute left-0 max-md:-left-[40%] max-md:-top-[40%] h-16 bg-gradient-to-r from-[#78C1CB] via-[#7FDF88] to-[#E55426] rounded w-full max-md:rotate-90"
            // style={{ width: "100%" }}
          ></div>
          <div
            className="absolute top-0 h-8 w-2 bg-[#009FF5] rounded transform -translate-y-2 hidden"
            style={{ left: calculateIndicatorPosition() }}
          ></div>
        </div>
        <div className="text-lg mt-10">Our Cost</div>
        <div className="font-bold text-left text-xl">
          ${totalChargesSum.toFixed(2)}
        </div>
        <div className="text-lg mt-4">Get a free Audit</div>
        <div className="font-bold text-left text-xl">
          getstarted@thedigitaltoolkit.com
        </div>
        <div className="text-lg mt-4">Schedule a Consultation</div>
        <div className="font-bold text-left text-xl">
          <Link
            className="text-blue-500"
            target="_blank"
            href="https://calendly.com/kkanbar/consultation"
          >
            https://calendly.com/kkanbar/consultation
          </Link>
        </div>
        {/* <div className="flex justify-between text-sm mt-10">
          <div>
            Undercharging Range <br /> ${underchargingMin.toFixed(2)} - $
            {underchargingMax.toFixed(2)}
          </div>
          <div>
            Average Price <br /> ${averagePrice.toFixed(2)}
          </div>
          <div>
            Overcharging Range <br /> ${overchargingMin.toFixed(2)} - $
            {overchargingMax.toFixed(2)}
          </div>
        </div> */}

        <div className="flex justify-between mt4 space-x-4 mt-20">
          <div className="flex justify-center mt4 space-x-4 mt20 ">
            <Link
              href="/summary"
              className="bg-[white] text-[#006296] border-[#006296] border-2 px-4 font-bold py-2 rounded"
            >
              Edit Services
            </Link>
            <div
              onClick={() => setShowModal(true)}
              className="bg-[white] text-[#006296] border-[#006296] border-2 px-4 py-2 font-bold rounded cursor-pointer"
            >
              Share Report
            </div>
          </div>

          <button
            className="px-4 py-2 bg-[#009FF5] font-bold text-white rounded hover:bg-blue-700 "
            onClick={handleDownload2}
          >
            Download Report
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">
              Enter Email to Send Report
            </h2>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded mr-2"
              >
                Close
              </button>
              <button
                onClick={handleDownload}
                disabled={!email || isSending}
                className={`bg-blue-500 text-white p-2 rounded ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="hidden max-md:block">
        <FinalPhone />
      </div>
    </>
  );
};

export default Final;
