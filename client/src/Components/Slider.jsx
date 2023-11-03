import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SliderCard } from "../Components";
import { motion } from "framer-motion";
import { slideIn, staggerFadeInOut } from "../Animations";

const Slider = () => {
  const products = useSelector((state) => state.products) || [];
  console.log("All Products:", products);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((data) => data.product_category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const filteredProducts = products.filter(
    (data) => !selectedCategory || data.product_category === selectedCategory
  );

  console.log("Selected Category:", selectedCategory);
  console.log("Filtered Products:", filteredProducts);
  return (
    <motion.div {...slideIn} className="w-full pt-5 mx-auto px-2 lg:px-20">
      <div className="text-2xl text-headingColor font-bold mb-4 relative">
        Menu
        <div className="w-[90px] h-1 rounded-md bg-blue-700"></div>
      </div>

      <div className="flex gap-2 mb-4">
        {categories.map((category, index) => (
          <motion.button
            key={index}
            {...staggerFadeInOut(index)}
            className={`${
              category === selectedCategory
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-800 hover:bg-blue-500"
            } py-2 px-4 rounded-md transition duration-300 font-bold`}
            onClick={() => handleCategoryClick(category)}
          >
            {capitalizeFirstLetter(category)}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-y-4">
        {filteredProducts.map((data, i) => (
          <div
            key={i}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2"
          >
            <SliderCard data={data} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Slider;
