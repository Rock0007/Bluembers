import React from "react";
import { motion } from "framer-motion";
import { buttonClick, staggerFadeInOut } from "../Animations";
import { HiCurrencyRupee } from "../assets/icons";
import { updateOrderSts, getAllOrder } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { useDispatch } from "react-redux";

const OrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();
  const handleClick = (orderId, sts) => {
    updateOrderSts(orderId, sts).then((Response) => {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };

  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">Orders</h1>
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-1 text-textColor text-base font-medium select-none">
            Total : <HiCurrencyRupee className="text-base text-blue-500" />{" "}
            <span className="text-headingColor font-bold">{data?.total}</span>{" "}
          </p>
          <p className="px-2 py-[2px] text-sm text-headingColor font-semibold capitalize rounded-md bg-emerald-400 drop-shadow-md select-none">
            {data?.status}
          </p>
          <p
            className={`text-base font-semibold capitalize border border-gray-300 px-2 select-none py-[2px] rounded-md ${
              (data.sts === "preparing" && "text-orange-500 bg-orange-100") ||
              (data.sts === "cancelled" && "text-red-500 bg-red-100") ||
              (data.sts === "ready" && "text-pink-500 bg-pink-100") ||
              (data.sts === "delivered" && "text-emerald-500 bg-emerald-100")
            }`}
          >
            {data?.sts}
          </p>
          {admin && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-semibold text-headingColor">Mark As</p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "preparing")}
                className="text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer select-none"
              >
                Preparing
              </motion.p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "cancelled")}
                className="text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer select-none"
              >
                Cancelled
              </motion.p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "ready")}
                className="text-pink-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer select-none"
              >
                Ready
              </motion.p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "delivered")}
                className="text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer select-none"
              >
                Delivered
              </motion.p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-start flex-wrap w-full">
        <div className="flex items-center justify-center gap-4">
          {data?.items &&
            data.items.map((item, j) => (
              <motion.div
                {...staggerFadeInOut}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.imageURL}
                  alt=""
                  className="w-14 h-14 object-contain select-none"
                />
                <div className="flex items-start flex-col ml-5">
                  <p className="text-base font-semibold text-headingColor">
                    {item.product_name}
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="text-textColor text-base font-medium select-none">
                      Qty : {item.quantity}
                    </p>
                    <p className="flex items-center gap-1 text-textColor">
                      <HiCurrencyRupee className="text-base text-blue-500" />
                      {parseFloat(item.product_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460">
          <h1 className="text-lg text-headingColor font-semibold">
            {data.customer.name}
          </h1>
          <p className="text-base text-headingColor -mt-2">
            Order ID: {data.orderId}
          </p>
        </div>
        {admin && (
          <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460">
            <h1 className="text-lg text-headingColor font-semibold">
              {data.customer.name}
            </h1>
            <p className="text-base text-headingColor -mt-2">
              Email: {data.customer.email}
              Phone No: {data.customer.phone}
              <br />
              Order ID: {data.orderId}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderData;
