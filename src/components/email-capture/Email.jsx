"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setServices, setField } from "../../redux/action/formSlice";

const Email = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((s) => s.form);
  const router = useRouter();
  const handlesub = () => {
    router.push("/services");
  };
  return (
    <>
      <main className="flex mi-screen flex-col items-center justify-between p24 max-w-6xl mx-auto  mt-20 max-md:p-2">
        <h1 className="text-[32px] font-bold text-[#012436] mb-4 leading-[108%]">
          Get the cost estimate mailed to your email
        </h1>

        <div className="w-full max-w-md  p-8 rounded-lg shadowmd">
          <Link className="font-bold flex gap-2 mb-8 items-center" href="/form">
            <div className="bg-[#A9DCF7] rounded-full p-1">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.499512 12.8579C0.499512 6.23051 5.8721 0.857925 12.4995 0.857925C19.1269 0.857925 24.4995 6.23051 24.4995 12.8579C24.4995 19.4853 19.1269 24.8579 12.4995 24.8579C5.8721 24.8579 0.499512 19.4853 0.499512 12.8579Z"
                  fill="#A9DCF7"
                />
                <path
                  d="M9.67383 12.8579L14.6309 17.8149L15.3248 17.1209L11.0618 12.8579L15.3248 8.59483L14.6309 7.90085L9.67383 12.8579Z"
                  fill="#006296"
                />
              </svg>
            </div>
            Go back
          </Link>
          <div className="mb-4 bg-white p-2 rounded-lg">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company-name"
            >
              Enter your email *
            </label>
            <input
              type="email"
              id="company-Email"
              name="email"
              value={email}
              onChange={(e) =>
                dispatch(setField({ key: "email", value: e.target.value }))
              }
              className="shado appearance-none bordernone rounded w-full py-2 px- text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your company name"
              required
            />
          </div>

          <button
            // href="/services"
            onClick={handlesub}
            className="w-full py-3 flex justify-center px-4 bg-[#009FF5] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          >
            Continue to the calculator
          </button>
        </div>
      </main>
    </>
  );
};

export default Email;
