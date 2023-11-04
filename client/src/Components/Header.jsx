import React, { useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "../assets";
import { headerActiveStyles, headerNoActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../Animations";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userAction";
import { setCartOn } from "../context/actions/dispalyCartAction";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
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
    <header className="fixed backdrop-blur-2xl z-50 inset-x-0 top-0 flex items-center justify-between px-6 md:px-12 py-4 border border-b-2 shadow-fuchsia-100 shadow-xl">
      <NavLink
        to={"/"}
        className="flex items-center justify-center gap-2 select-none px-24"
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-1"
        >
          <p className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
            BluEmbers
          </p>

          {isHovered && <ImSpoonKnife size={20} />}
        </div>
      </NavLink>
      <nav className="flex items-center justify-center gap-6 font-semibold">
        <ul className="hidden md:flex items-center justify-center gap-6 select-none text-black">
          <NavLink
            className={({ isActive }) =>
              isActive ? headerActiveStyles : headerNoActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? headerActiveStyles : headerNoActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? headerActiveStyles : headerNoActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>

        <div className="md:hidden">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>

          {isOpen && (
            <motion.div
              {...slideTop}
              onMouseLeave={() => setIsMenu(false)}
              className="px-4 py-2 w-40 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-10 right-0 flex flex-col gap-3"
            >
              <ul className="mt-2 mb-4 flex flex-col items-center gap-3">
                <Link
                  className="hover:text-blue-700 text-sm text-textColor"
                  to={"/"}
                >
                  Home
                </Link>
                <Link
                  className="hover:text-blue-700 text-sm text-textColor"
                  to={"/menu"}
                >
                  Menu
                </Link>
                <Link
                  className="hover:text-blue-700 text-sm text-textColor"
                  to={"/aboutus"}
                >
                  About Us
                </Link>
              </ul>
            </motion.div>
          )}
        </div>

        {user ? (
          <>
            <motion.div
              {...buttonClick}
              className="relative cursor-pointer"
              onClick={() => dispatch(setCartOn())}
            >
              <MdShoppingCart className="text-2xl text-black" />
              {cart?.length > 0 && (
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-3 -right-1">
                  <p className="text-primary text-sm font-semibold">
                    {cart.length}
                  </p>
                </div>
              )}
            </motion.div>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsMenu(true)}
            >
              <div className="w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  {...buttonClick}
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>
              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className="px-4 py-2 w-40 bg-lightOverlay backdrop-blur-xl rounded-md shadow-md absolute top-10 right-0 flex flex-col gap-3"
                >
                  {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                    <Link
                      className="hover:text-blue-600 text-md text-black font-semibold"
                      to={"/dashboard/home"}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    className="hover:text-blue-600 text-md text-black font-semibold"
                    to={"/profile"}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="hover:text-blue-600 text-md text-black font-semibold"
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-2 py-1 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-2"
                  >
                    <MdLogout className="text-xl text-textColor group-hover:text-headingColor" />
                    <p className="text-textColor text-sm font-semibold group-hover:text-red-600">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.div
                {...buttonClick}
                className="px-3 py-1 rounded-md shadow-md bg-gray-200 border border-red-300 cursor-pointer"
              >
                Login
              </motion.div>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
