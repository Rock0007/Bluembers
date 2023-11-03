import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, ForgotPassword, Login, Main } from "./containers";
import { app } from "./config/firebase.config";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./context/actions/userAction";
import { fadeInOut } from "./Animations";
import { motion } from "framer-motion";
import {
  Alert,
  CheckOutSuccess,
  MainLaoder,
  Menu,
  UsersOrders,
} from "./Components";
import { setCartItems } from "./context/actions/cartAction";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                console.log(items);
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLaoder />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/user-orders" element={<UsersOrders />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Alert />
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
