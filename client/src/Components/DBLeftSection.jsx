import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaPlus, FaUser } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { isActiveStyles, isNoActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="h-full py-6 flex flex-col bg-white shadow-md min-w-210 w-300 gap-2 overflow-hidden">
      <NavLink to="/" className="flex items-center justify-start px-4 mb-4">
        <p className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none hover:border-b-2">
          BluEmbers
        </p>
      </NavLink>
      <hr />
      <ul className="flex flex-col gap-2">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-blue-800 flex items-center`
              : isNoActiveStyles
          }
        >
          <FaHome className="mr-2" /> Home
        </NavLink>

        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-blue-800 flex items-center`
              : isNoActiveStyles
          }
        >
          <FaShoppingCart className="mr-2" /> Orders
        </NavLink>

        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-blue-800 flex items-center`
              : isNoActiveStyles
          }
        >
          <ImSpoonKnife className="mr-2" /> Items
        </NavLink>

        <NavLink
          to={"/dashboard/newItem"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-blue-800 flex items-center`
              : isNoActiveStyles
          }
        >
          <FaPlus className="mr-2" /> Add New Item
        </NavLink>

        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-blue-800 flex items-center`
              : isNoActiveStyles
          }
        >
          <FaUser className="mr-2" /> Users
        </NavLink>
      </ul>

      <div className="flex-1 flex flex-col items-center justify-end mt-auto px-4">
        <div className="mb-4 rounded-md bg-blue-500 p-3 w-full max-w-md shadow-md flex flex-col gap-2 text-center">
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
            <p className="text-lg font-bold text-blue-900">?</p>
          </div>
          <p className="text-base font-semibold text-white">Help Center</p>
          <p className="text-sm text-white">Experiencing issues? Contact us.</p>
          <button className="px-3 py-1 rounded-full bg-white text-blue-600 font-semibold cursor-pointer">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
