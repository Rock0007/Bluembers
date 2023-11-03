import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IoFastFood } from "../assets/icons";
import { statuses } from "../utils/styles";
import SliderCard from "./SliderCard";

const FilterSection = () => {
  const [category, setCategory] = useState("appetizers");
  const products = useSelector((state) => state.products);

  const filteredProducts = products
    ? products.filter((data) => data.product_category === category)
    : [];

  // const filteredProducts = products.filter(
  //   (data) => data.product_category === category
  // );

  return (
    <motion.div className="w-full flex flex-col items-center justify-start mb-10">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">Dishes</p>
          <div className="w-[90px] h-1 rounded-md bg-blue-700"></div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 py-4 overflow-hidden overflow-x-auto overflow-y-auto">
        {statuses.map((data, i) => (
          <FilterCard
            key={i}
            data={data}
            category={category}
            setCategory={setCategory}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((data, i) => (
            <div key={i} className="w-[calc(25% - 16px)]">
              <SliderCard data={data} index={i} />
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center h-40">
            <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg">
              <span role="img" aria-label="Sad Face" className="text-2xl mr-2">
                😔
              </span>{" "}
              Out of Stock..!
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, category, setCategory }) => {
  const isActive = category === data.category;

  return (
    <motion.div
      onClick={() => setCategory(data.category)}
      className={`group cursor-pointer rounded-md p-2 ${
        isActive ? "bg-blue-500" : "bg-primary"
      } hover:bg-blue-500 shadow-md flex flex-col items-center justify-center gap-2`}
    >
      <div
        className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          isActive ? "bg-primary" : "bg-blue-500"
        }`}
      >
        <IoFastFood
          className={`${
            isActive ? "text-blue-500" : "text-primary"
          } group-hover:text-blue-500`}
        />
      </div>
      <p
        className={`text-sm font-semibold ${
          isActive ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};

export default FilterSection;
