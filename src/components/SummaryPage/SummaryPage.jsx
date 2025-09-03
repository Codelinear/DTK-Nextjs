"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeService } from "../../redux/action/serviceSlice";
// import { useDispatch, useSelector } from "react-redux";
import { setServices, setField } from "../../redux/action/formSlice";

const SummaryPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { serviceCharges } = useSelector((state) => state.services);
  //  uncomment // dispatch(setServices(serviceCharges));
  console.log(serviceCharges);
  // console.log(serviceCharges.totalCharges);
  const x = serviceCharges.totalCharges;
  // console.log(x);
  const totalChargesSum = Object.values(serviceCharges).reduce(
    (total, service) => {
      const charges = parseFloat(service.totalCharges);
      return total + (isNaN(charges) ? 0 : charges);
    },
    0
  );

  const totalCharge = Object.values(serviceCharges).reduce((total, service) => {
    const charges = parseFloat(service.totalCharges);
    return total + (isNaN(charges) ? 0 : charges);
  }, 0);

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
  dispatch(setField({ key: "totalCost", value: totalChargesSum }));
  dispatch(setField({ key: "undercharging", value: underchargingMin }));
  dispatch(setField({ key: "averagePrice", value: averagePrice }));
  dispatch(setField({ key: "overcharging", value: overchargingMin }));
  dispatch(setField({ key: "ourCost", value: totalCharge }));
  const formData = useSelector((s) => s.form);

  // console.log(formData);

  const [expandedService, setExpandedService] = useState(null);

  // const dispatch = useDispatch();

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleEdit = (serviceId) => {
    router.push(`/services/${serviceId}`);
  };

  const handleDelete = (serviceId) => {
    dispatch(removeService(serviceId));
  };

  const SubmitButton = async () => {
    // const formData = useSelector((s) => s.form);

    // const handleSubmit = async () => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("API response:", data);
    if (data.status == 201) {
      router.push("/final");
    }
    // };

    // return <button onClick={handleSubmit}>Submit & Send Email</button>;
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-[28px] font-bold mb-4">Summary</h1>
      <Link className="font-bold flex gap-2 items-center mb-8" href="/services">
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
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left text-[14px] font-normal p-2"></th>
            <th className="text-left text-[14px] font-normal p-2">Service</th>
            <th className="text-left text-[14px] font-normal p-2">amount</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(serviceCharges).map(([serviceId, charges]) => (
            <>
              <tr
                key={`${serviceId}-name`}
                className="cursor-pointer bg-[#fff] m-2 p4 space-y-4 w-full "
                onClick={() => toggleService(serviceId)}
              >
                <td className="p-2 w-[50px]">
                  {expandedService === serviceId ? (
                    <svg
                      width="21"
                      height="12"
                      viewBox="0 0 21 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9824 0L20.9824 10L19.5824 11.4L10.9824 2.8L2.38242 11.4L0.982422 10L10.9824 0Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="21"
                      height="12"
                      viewBox="0 0 21 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9824 11.4L20.9824 1.39999L19.5824 -5.72205e-06L10.9824 8.59999L2.38242 -5.72205e-06L0.982422 1.39999L10.9824 11.4Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </td>
                <td className="p-2 font-semibold text-[18px] w-full">
                  {charges.ServiceName}
                </td>
                <td className="p-2 font-semibold text-right text-[18px] w-full">
                  ${charges.totalCharges.toLocaleString()}
                </td>
              </tr>

              {expandedService === serviceId &&
                Object.entries(charges)
                  .filter(
                    ([key]) => key !== "ServiceName" && key !== "totalCharges"
                  ) // Filter out "ServiceName" and "totalCharges"
                  .map(([chargeName, amount]) => (
                    <tr
                      key={`${serviceId}-${chargeName}`}
                      className="border-b-[1px] border-[#000] border-opacity-20"
                    >
                      <td className="p-2 w-[50px] "></td>
                      <td className="p-2">{chargeName}</td>
                      <td className="p-2">{`$${amount}`}</td>
                    </tr>
                  ))}

              {expandedService === serviceId && (
                <tr>
                  <td className="p-2 w-[50px] "></td>

                  <td colSpan="3" className="p-2 flex justify-between gap-4">
                    <button
                      onClick={() => handleEdit(serviceId)}
                      className="text-[#006296]"
                    >
                      Edit Deliverables
                    </button>

                    <button
                      onClick={() => handleDelete(serviceId)}
                      className="bg-[white] text-[#C03744] border-[#C03744] border-2 px-4 py-2 rounded flex items-center gap-2 max-md:px-1 "
                    >
                      <span>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.64844 14.5C5.28177 14.5 4.96799 14.3696 4.7071 14.1087C4.44622 13.8478 4.31555 13.5338 4.3151 13.1667V4.5H3.64844V3.16667H6.98177V2.5H10.9818V3.16667H14.3151V4.5H13.6484V13.1667C13.6484 13.5333 13.518 13.8473 13.2571 14.1087C12.9962 14.37 12.6822 14.5004 12.3151 14.5H5.64844ZM12.3151 4.5H5.64844V13.1667H12.3151V4.5ZM6.98177 11.8333H8.3151V5.83333H6.98177V11.8333ZM9.64844 11.8333H10.9818V5.83333H9.64844V11.8333Z"
                            fill="#C03744"
                          />
                        </svg>
                      </span>
                      Remove service
                    </button>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[24px] font-semibold">Total Cost</span>
        <span className="text-[24px] font-semibold">{`$${totalChargesSum.toLocaleString()}`}</span>
      </div>
      <div className="flex justify-between gap-5 max-md:flex-col">
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/services")}
            className="bg-[white] text-[#006296] border-[#006296] border-2 px-4 py-2 rounded flex items-center gap-2  max-md:px-1"
          >
            <span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8183 8.83588C14.9074 8.7468 14.9574 8.62598 14.9574 8.5C14.9574 8.37402 14.9074 8.2532 14.8183 8.16412C14.7292 8.07504 14.6084 8.025 14.4824 8.025H9.45742V3C9.45742 2.87402 9.40738 2.7532 9.3183 2.66412C9.22922 2.57504 9.1084 2.525 8.98242 2.525C8.85644 2.525 8.73563 2.57504 8.64655 2.66412C8.55747 2.7532 8.50742 2.87402 8.50742 3V8.025H3.48242C3.35644 8.025 3.23563 8.07504 3.14655 8.16412C3.05747 8.2532 3.00742 8.37402 3.00742 8.5C3.00742 8.62598 3.05747 8.7468 3.14655 8.83588C3.23563 8.92496 3.35644 8.975 3.48242 8.975H8.50742V14C8.50742 14.126 8.55747 14.2468 8.64655 14.3359C8.73563 14.425 8.85644 14.475 8.98242 14.475C9.1084 14.475 9.22922 14.425 9.3183 14.3359C9.40738 14.2468 9.45742 14.126 9.45742 14V8.975H14.4824C14.6084 8.975 14.7292 8.92496 14.8183 8.83588Z"
                  fill="#006296"
                  stroke="#006296"
                  stroke-width="0.2"
                />
              </svg>
            </span>
            Add another service
          </button>
        </div>
        <button
          onClick={SubmitButton}
          className="bg-[#009FF5] text-white px-4 py-2 rounded"
        >
          Generate agency rate
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
