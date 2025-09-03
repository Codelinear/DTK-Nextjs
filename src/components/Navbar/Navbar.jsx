import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header className="w-full py-4 bg-gray-200 text-center shadow-md">
        <Link href="/" className="flex justify-center items-center gap-3">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.91959 11.6889L2.4704 19.1381C1.64756 19.9608 1.64756 21.295 2.4704 22.1177C3.29315 22.9407 4.62722 22.9407 5.45006 22.1177L12.8992 14.6686"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.4439 15.0524L21.5296 19.1381C22.3524 19.9609 22.3524 21.295 21.5296 22.1177C20.7068 22.9407 19.3727 22.9407 18.5499 22.1177L12.0095 15.5773"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.42452 6.73466L4.1898 7.4795L1.95508 3.75491L3.44486 2.26513L7.16945 4.49984L6.42452 6.73466ZM6.42452 6.73466L9.40614 9.71619"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.91961 11.6889C9.03067 9.42078 9.20448 6.44469 11.037 4.61216C12.8695 2.77962 16.2514 2.37744 18.1137 3.49475L14.9104 6.69809L14.6127 9.9755L17.89 9.67775L21.0934 6.4745C22.2108 8.33675 21.8085 11.7187 19.9761 13.5512C18.1435 15.3837 15.1675 15.5576 12.8994 14.6685"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h1 className="text-lg font-semibold text-gray-800">
            The
            <span className="text-[#006296]">Digital</span>
            Toolkit
          </h1>
        </Link>
      </header>
    </>
  );
};

export default Navbar;
