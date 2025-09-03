"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
import { addService } from "../../redux/action/serviceSlice";
import { useRouter } from "next/navigation";
const services = [
  { id: "1", name: "Paid Social" },
  { id: "2", name: "Paid Ads" },
  { id: "3", name: "SEO" },
  { id: "4", name: "Content Marketing" },
  { id: "5", name: "Digital PR" },
  { id: "6", name: "Organic Social Media" },
  { id: "7", name: "Amazon Marketing" },
  { id: "8", name: "Creative and Design" },
];

export default function Service() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const handleServiceSelect = (service) => {
    const alreadySelected = selected.includes(service.id);
    setSelected((prev) =>
      alreadySelected
        ? prev.filter((id) => id !== service.id)
        : [...prev, service.id]
    );
    dispatch(addService(service));
  };

  const handleNext = () => {
    if (selected.length > 0) {
      router.push(`/services/${selected[0]}`);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-[802px] mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] font-bold mb-4">
          Select the services you need
        </h1>
        <button
          onClick={handleNext}
          className="mt-4 bg-[#009FF5] text-white px-8 py-2 rounded"
        >
          Next
        </button>
      </div>
      <p className="mb-4">You can add more later</p>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center py-8 px-6 bordr rounded-md bg-[#fff] max-md:flex-col max-md:justify-center max-md:gap-2"
          >
            <input
              className="mr-2"
              type="checkbox"
              id={service.id}
              onChange={() => handleServiceSelect(service)}
            />
            <label
              htmlFor={service.id}
              className="flex-grow cursor-pointer text-[18px] text-[#000] font-semibold max-md:text-center"
            >
              {service.name}
            </label>

            {/* <div className="abs group">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6">
                  <path
                    d="M12 17H13V11.5H12V17ZM12.5 10.077C12.6747 10.077 12.821 10.018 12.939 9.9C13.057 9.782 13.1157 9.63567 13.115 9.461C13.1143 9.28633 13.0553 9.14033 12.938 9.023C12.8207 8.90567 12.6747 8.84667 12.5 8.846C12.3253 8.84533 12.1793 8.90433 12.062 9.023C11.9447 9.14167 11.8857 9.288 11.885 9.462C11.8843 9.636 11.9433 9.782 12.062 9.9C12.1807 10.018 12.3267 10.077 12.5 10.077ZM12.503 21.5C11.2583 21.5 10.0883 21.264 8.993 20.792C7.89767 20.3193 6.94467 19.678 6.134 18.868C5.32333 18.058 4.68167 17.106 4.209 16.012C3.73633 14.918 3.5 13.7483 3.5 12.503C3.5 11.2577 3.73633 10.0877 4.209 8.993C4.681 7.89767 5.32133 6.94467 6.13 6.134C6.93867 5.32333 7.891 4.68167 8.987 4.209C10.083 3.73633 11.253 3.5 12.497 3.5C13.741 3.5 14.911 3.73633 16.007 4.209C17.1023 4.681 18.0553 5.32167 18.866 6.131C19.6767 6.94033 20.3183 7.89267 20.791 8.988C21.2637 10.0833 21.5 11.253 21.5 12.497C21.5 13.741 21.264 14.911 20.792 16.007C20.32 17.103 19.6787 18.056 18.868 18.866C18.0573 19.676 17.1053 20.3177 16.012 20.791C14.9187 21.2643 13.749 21.5007 12.503 21.5ZM12.5 20.5C14.7333 20.5 16.625 19.725 18.175 18.175C19.725 16.625 20.5 14.7333 20.5 12.5C20.5 10.2667 19.725 8.375 18.175 6.825C16.625 5.275 14.7333 4.5 12.5 4.5C10.2667 4.5 8.375 5.275 6.825 6.825C5.275 8.375 4.5 10.2667 4.5 12.5C4.5 14.7333 5.275 16.625 6.825 18.175C8.375 19.725 10.2667 20.5 12.5 20.5Z"
                    fill="black"
                  />
                </g>
              </svg>
              <div className="bg-[#fff] text-black hidden group-hover:block absolute w-[330px] p-3 shadow-md">
                Lorem a cursus suscipit egestas congue nibh mattis. Risus
                posuere enim vulputate interdum bibendum ipsum integer. Cras ut
                euismod elit convallis gravida feugiat ligula nullam id. Eu
                velit volutpat id semper.
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
