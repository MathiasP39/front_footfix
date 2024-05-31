import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setOpen] = useState(false);
  
    const handleDropDown = () => {
      setOpen(!isOpen);
    };

    return (
    <div className="dropdown inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open main menu</span  >
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            onClick={handleDropDown}>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
        </button>
        <div
        style={{ top: "calc(70% + 10px)", right: 0 }}
        id="dropdown"
        className={`absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ${
          isOpen ? "block" : "hidden"
        }`}>
        <ul className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow ">
            <li
            >
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Lien 1
              </a>
            </li>
            <li
            >
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Lien 2
              </a>
            </li>
            <li
            >
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Lien 3
              </a>
            </li>
            <li
            >
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Lien 3
              </a>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar