import Link from "next/link";
import React from "react";
// import Link from "next/link";
// import Link from "next/link";
const Home = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p24 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center h-screen bggray-100">
          <main className="flex flex-col items-center justify-center flex-1 text-center max-w-3xl mx-auto max-md:p-2">
            <div className="mb-4 py-2 px-3  bg-white rounded-full shadow-md">
              <p className="text-sm text-[#000] font-normal">
                Agency Rate Calculator
              </p>
            </div>
            <h1 className="text-[64px] max-md:text-[50px] font-bold text-[#012436] mb-4 leading-[108%]">
              Calculate your agency cost for free
            </h1>
            <p className="text-lg text-[#000] mb-8 max-w-xl mx-auto">
              Estimate the costs of the deliverables within minutes. Learn what
              service works best for you.
            </p>
            <Link
              href="/form"
              className="px-8 py-2 bg-[#009FF5] text-white rounded-md hover:bg-blue-600"
            >
              Get Started
            </Link>
          </main>
        </div>
      </main>
    </>
  );
};

export default Home;
