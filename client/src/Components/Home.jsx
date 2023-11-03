import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineFastfood } from "../assets";
import { staggerFadeInOut } from "../Animations";
import { randomData } from "../utils/styles";
import { HiCurrencyRupee } from "../assets/icons";

const Home = () => {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col items-center justify-center">
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-screen-lg p-6 md:p-12 rounded-lg bg-primary shadow-xl shadow-pink-100">
        {/* Content grid column */}
        <div className="flex flex-col items-start gap-6">
          <div className="px-3 py-1 flex items-center justify-center gap-2 bg-blue-200 rounded-full">
            <p className="text-md font-semibold text-blue-500">
              Made in a Jiffy
            </p>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-300 shadow-md">
              <img
                src={MdOutlineFastfood}
                alt=""
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-sans font-extrabold tracking-wider">
            The Quick and Delicious Delivery in{" "}
            <span className="text-blue-700">BluEmbers</span>
          </p>
          <p className="text-sm text-black select-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            illo porro consectetur explicabo animi repellendus doloribus nihil
            quis asperiores voluptate nisi architecto ullam aliquid pariatur
            voluptatum, cum neque sapiente fuga. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Accusantium illo porro consectetur
            explicabo animi repellendus doloribus nihil quis asperiores
            voluptate nisi architecto ullam aliquid pariatur voluptatum, cum
            neque sapiente fuga.
          </p>
          <Link
            to="/menu"
            className="bg-gradient-to-bl from-blue-400 to-blue-600 px-3 py-1 rounded text-black text-sm font-semibold hover:from-blue-600 hover:to-blue-800 transition duration-300"
          >
            Order Now
          </Link>
        </div>
        {/* Empty grid column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {randomData &&
            randomData.map((data, i) => (
              <motion.div
                key={i}
                {...staggerFadeInOut(i)}
                className="p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center hover:bg-gradient-to-bl from-blue-100 to-blue-300 transition duration-300"
              >
                <img
                  src={data.imageURL}
                  className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain"
                  alt=""
                />
                <p className="text-[15px] lg:text-sm font-semibold text-black">
                  {data.product_name.slice(0, 14)}
                </p>
                <p className="text-[12px] text-center md:text-base text-textColor font-semibold capitalize">
                  {data.product_category}
                </p>
                <p className="text-lg font-semibold text-headingColor flex items-start gap-1 justify-start">
                  <HiCurrencyRupee className="text-blue-600 mt-1" />
                  {parseFloat(data.product_price).toFixed(2)}
                </p>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
