import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { buttonClick, slideIn, staggerFadeInOut } from "../Animations";
import { setCartOff } from "../context/actions/dispalyCartAction";
import {
  BiChevronsRight,
  HiCurrencyRupee,
  MdShoppingCart,
} from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
import { alertSuccess, alertNULL } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";
import { MdFilterList } from "react-icons/md";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setTotal(tot);
      });
    }
  }, [cart]);

  const handleCheckout = () => {
    const data = {
      user: user,
      cart: cart,
      total: total,
    };
    axios
      .post(`${baseURL}/api/products/create-checkout-session`, { data })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 pb-12 px-3">
        <motion.i
          {...buttonClick}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.i>
        <div className="flex items-center">
          <MdShoppingCart className="text-[30px] text-headingColor" />
          <p className="text-xl text-headingColor font-semibold ml-2">
            Your Cart
          </p>
        </div>
        <motion.i {...buttonClick} className="cursor-pointer">
          <MdFilterList
            className="text-[30px] text-textColor font-bold"
            title="Filter"
          />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-6 gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className="bg-zinc-800 rounded-t-[12px] w-full flex flex-col items-center">
              <div className="w-full h-[25%] flex items-start px-6 py-5">
                <p className="text-xl text-zinc-300 font-semibold">Total:</p>
                <p className="text-xl text-blue-300 font-semibold flex items-center gap-1 pl-2">
                  <HiCurrencyRupee className="text-blue-500" />
                  {total}
                </p>
              </div>
              <motion.div
                {...buttonClick}
                className="w-auto px-2 py-2 text-xl bg-blue-400 text-headingColor flex items-start font-semibold hover:bg-blue-500 drop-shadow-md rounded-xl cursor-pointer select-none"
                onClick={handleCheckout}
              >
                Check Out
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-primary font-bold p-40">Empty Cart</h1>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartItem"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Updating the cart item"));

    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4"
    >
      <img
        src={data?.imageURL}
        className="w-20 min-w-[94px] h-20 object-contain"
        alt=""
      />

      <div className="flex items-center justify-start gap-1 w-full">
        <p className="text-base text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-blue-400 ml-auto">
          <HiCurrencyRupee className="text-blue-400" />
          {itemTotal}
        </p>
      </div>
      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="tex-xl font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-lg text-primary font-semibold">{data?.quantity}</p>
        <motion.div
          {...buttonClick}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          onClick={() => incrementCart(data?.productId)}
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
