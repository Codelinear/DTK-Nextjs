"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { setServices, setField } from "../../redux/action/formSlice";

const Form = () => {
  //  const router = useRouter();
  const router = useRouter();
  const handlesub = () => {
    router.push("/email-capture");
  };
  const [newinput, setNewInput] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [otherValue, setOtherValue] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleOtherChange = (e) => {
    setOtherValue(e.target.value);
  };

  const dispatch = useDispatch();
  const { companyName, companySize, companyType } = useSelector((s) => s.form);
  const handleChange = (e) => {
    dispatch(setField({ key: e.target.name, value: e.target.value }));
  };

  return (
    <>
      <main className="flex min-hscreen flex-col items-center justify-between p24 max-w-6xl mx-auto  mt-20 max-md:p-2">
        <h1 className="text-[32px] font-bold text-[#012436] mb-4 leading-[108%]">
          Tell us about your business
        </h1>
        <div className="w-full max-w-md  p-8 rounded-lg shadowmd">
          <div className="mb-4 bg-white p-4 rounded-lg">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter your company name *
            </label>
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={handleChange}
              className="shado appearance-none bordernone rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your company name"
            />
          </div>

          <div className="mb-4 bg-white p-4 rounded-lg">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company-size"
            >
              Select your business size *
            </label>
            <select
              id="company-size"
              name="companySize"
              className="hadow order rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              value={companySize}
              onChange={handleChange}
            >
              {/* <option value="">Select company size</option> */}
              <option value="small">1-10</option>
              <option value="medium">11-50</option>
              <option value="large">51-200</option>
              <option value="201-500-large">201-500</option>
              <option value="501-1000-large">501-1000</option>
              <option value="1001-10000-large">1001-10000</option>
              <option value="10001+-large">10001+</option>
            </select>
          </div>
          <div className="mb-4 bg-white p-4 rounded-lg">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="industry-type"
            >
              Select your business industry *
            </label>
            <select
              id="industry-type"
              required
              name="companyType"
              // value={selectedOption}
              value={companyType}
              onChange={handleChange}
              className="sadow  :placeholder-opacity bordr rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {/* <option value="">Select industry type</option> */}
              <option className="text-[#090A0B] opacity-75 " value="technology">
                Technology
              </option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="Saas">Saas</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Finance">Finance</option>
              <option value="Finance">Hospitality</option>
              <option value="IT/ITeS">IT/ITeS</option>
              <option value="other">Other</option>

              {/* Add more options as needed */}
            </select>

            {selectedOption === "other" && (
              <div className="mt-4">
                <label className="mr-4" htmlFor="otherInput">
                  Please specify:
                </label>
                <input
                  type="text"
                  id="otherInput"
                  value={otherValue}
                  onChange={handleChange}
                  placeholder="Enter other option"
                />
              </div>
            )}
          </div>

          <button
            // href="/Email-capture"
            // type="submit"
            onClick={handlesub}
            // onClick={() =>}
            className="w-full justify-center items-center flex py-4 px20 bg-[#009FF5] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </div>
      </main>
    </>
  );
};

export default Form;
