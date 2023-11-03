import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNoActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="h-full py-6 flex flex-col bg-white shadow-md min-w-210 w-300 gap-2 overflow-scroll">
      <NavLink to={"/"} className="flex items-center justify-start px-4">
        {/* <img src={Logo} className="w-6" alt="" /> */}
        <p className="text-lg font-bold text-orange-400">BluEmbers</p>
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-2">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-orange-500`
              : isNoActiveStyles
          }
        >
          Home
        </NavLink>

        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-red-500`
              : isNoActiveStyles
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-red-500`
              : isNoActiveStyles
          }
        >
          Items
        </NavLink>
        <NavLink
          to={"/dashboard/newItem"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-red-500`
              : isNoActiveStyles
          }
        >
          Add New Item
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-3 py-1 border-l-4 border-red-500`
              : isNoActiveStyles
          }
        >
          Users
        </NavLink>
      </ul>

      <div className="flex items-center justify-center px-2 mt-auto h-56">
        <div className="rounded-md bg-orange-500 p-3 w-full max-w-md shadow-md flex flex-col gap-2">
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
            <p className="text-lg font-bold text-orange-500">?</p>
          </div>
          <p className="text-base font-semibold text-white">Help Center</p>
          <p className="text-sm text-white text-center">
            Experiencing issues? Contact us.
          </p>
          <button className="px-3 py-1 rounded-full bg-white text-orange-400 cursor-pointer">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
