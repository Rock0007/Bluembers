import React from "react";
import { FaArrowLeft } from "../assets/icons";
import { NavLink } from "react-router-dom";
import { Bill2 } from "../assets";
import { motion } from "framer-motion";
import { Header } from "../Components";
import { buttonClick } from "../Animations";

const CheckoutSuccess = () => {
  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <img
          src={Bill2}
          className="w-80 md:w-96 max-w-full"
          alt=""
          style={{ userSelect: "none" }}
        />
        <h1 className="text-xl md:text-4xl 2xl:text-2xl text-headingColor font-bold">
          Amount paid Successfully
        </h1>
        <motion.div {...buttonClick}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-xl md:text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-xl md:text-2xl text-textColor" /> Get
            back to Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
