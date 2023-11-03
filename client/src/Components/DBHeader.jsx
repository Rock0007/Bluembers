import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsFillBellFill,
  BsToggles2,
  MdSearch,
  MdLogout,
} from "../assets/icons";
import { Avatar } from "../assets";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userAction";

const DBHeader = () => {
  const user = useSelector((state) => state.user);

  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 py-3 md:py-0">
      <p className="text-lg md:text-2xl text-headingColor">
        Welcome to BluEmbers
        {user?.name && (
          <span className="block text-sm md:text-base text-gray-500">{`Hello ${user?.name}...!`}</span>
        )}
      </p>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <div className="flex items-center justify-center gap-1 md:gap-3 px-2 py-1 md:px-3 md:py-2 bg-gray-50 backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search here..."
            className="border-none outline-none bg-transparent text-sm md:text-base font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-400 text-xl" />
        </div>
        <motion.div
          {...buttonClick}
          className="w-8 h-8 rounded-md cursor-pointer bg-gray-50 backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-lg" />
        </motion.div>
        <div className="flex items-center justify-center gap-1 md:gap-2">
          <div className="w-8 h-8 rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.picture ? user?.picture : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            {...buttonClick}
            onClick={signOut}
            className="w-8 h-8 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <MdLogout className="text-gray-400 text-lg" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
