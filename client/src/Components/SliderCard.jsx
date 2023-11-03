import React from "react";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { addNewItemToCart, getAllCartItems } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";

const SliderCard = ({ data }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    addNewItemToCart(user?.user_id, data).then((res) => {
      dispatch(alertSuccess("Added to the cart"));
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  return (
    <div className="card w-60 max-h-96 rounded-md shadow-md bg-lightOverlay mb-4 hover:shadow-xl hover:shadow-blue-200">
      <div className="max-h-48 max-w-72 overflow-hidden">
        <div
          style={{ maxHeight: "200px", maxWidth: "286px", overflow: "hidden" }}
        >
          <img
            src={data.imageURL}
            className="card-img-top w-full h-48 object-cover rounded-md"
            alt="..."
          />
        </div>
        <hr />
      </div>

      <div className="card-body p-3">
        <p className="text-[18px] lg:text-base font-semibold text-black">
          {data.product_name}
        </p>

        <p className="text-[20px] text-start md:text-base text-textColor font-semibold capitalize">
          {data.product_category}
        </p>

        <p className="text-lg font-semibold text-headingColor flex items-start gap-1 justify-start">
          <HiCurrencyRupee className="text-blue-600 mt-1" />
          {parseFloat(data.product_price).toFixed(2)}
        </p>

        <div className="my-1" />

        <motion.div
          {...buttonClick}
          className="px-3 py-1 rounded-md shadow-md bg-black text-white flex items-center w-[65%] cursor-pointer"
          onClick={sendToCart}
        >
          <motion.div
            {...buttonClick}
            className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-2 cursor-pointer"
          >
            <IoBasket className="text-base text-primary" />
          </motion.div>
          <p className="flex-grow">Add to Cart</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCard;
