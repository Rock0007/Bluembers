import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick, fadeInOut } from "../Animations";
import { useDispatch, useSelector } from "react-redux";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userAction";
import {
  alertInfo,
  alertNULL,
  alertWarning,
} from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const resetPassword = () => {
    navigate("/ForgotPassword");
  };
  const newlogin = () => {
    navigate("/NewLogin");
  };

  const loginWithGoogle = async () => {
    try {
      const userCred = await signInWithPopup(firebaseAuth, provider);
      const token = await userCred.user.getIdToken();
      const data = await validateUserJWTToken(token);

      dispatch(setUserDetails(data));
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      dispatch(alertWarning("Required fields should not be empty"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }

    if (!userEmail.endsWith("@gmail.com")) {
      dispatch(alertWarning("Invalid Gmail address"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }

    if (password.length < 6) {
      dispatch(alertWarning("Password must be at least 6 characters"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }

    if (password !== confirm_password) {
      dispatch(alertWarning("Passwords do not match"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        firebaseAuth,
        userEmail,
        password
      );
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle specific error messages if needed
      dispatch(alertWarning("Error creating user. Please try again."));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  };

  const signInWithEmailPass = async (e) => {
    e.preventDefault();
    if (userEmail !== "" && password !== "") {
      try {
        await signInWithEmailAndPassword(firebaseAuth, userEmail, password);
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {});
              navigate("/", { replace: true });
            });
          }
        });
      } catch (error) {
        dispatch(alertWarning("Invalid email or password"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000); // Display for 3 seconds
      }
    } else {
      dispatch(alertWarning("Please enter both email and password"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000); // Display for 3 seconds
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900 w-full">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isSignUp ? "Sign-up" : "Sign-in"} with following
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@gmail.com"
                  inputState={userEmail}
                  inputStateFunc={setUserEmail}
                  isSignUp={isSignUp}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  inputState={password}
                  inputStateFunc={setpassword}
                  isSignUp={isSignUp}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              {isSignUp && (
                <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    inputState={confirm_password}
                    inputStateFunc={setConfirm_password}
                    isSignUp={isSignUp}
                    value={confirm_password}
                    onChange={(e) => setConfirm_password(e.target.value)}
                  />
                </div>
              )}
              {isSignUp && (
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-600 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>

                  <div class="ml-3 text-base">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-blue-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
              )}
              {!isSignUp ? (
                <>
                  <div class="text-base">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      Forgot Password?
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-blue-500 ml-1"
                        onClick={resetPassword}
                      >
                        Reset
                      </a>
                    </label>
                  </div>
                  <div class="text-base">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      Don't Have an Account?
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-blue-500 ml-1"
                        onClick={() => setIsSignUp(true)}
                      >
                        Create One
                      </a>
                    </label>
                  </div>
                </>
              ) : (
                <div class="text-base">
                  <label
                    for="terms"
                    class="font-light text-gray-500 dark:text-gray-300"
                  >
                    Already have an Account
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-blue-500 ml-1"
                      onClick={() => setIsSignUp(false)}
                    >
                      Sign-in
                    </a>
                  </label>
                </div>
              )}
              {isSignUp ? (
                <button
                  type="submit"
                  class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 select-none"
                  onClick={signUpWithEmailPass}
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="submit"
                  class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 select-none"
                  onClick={signInWithEmailPass}
                >
                  Sign In
                </button>
              )}
              <div className="flex items-center my-6">
                <div className="flex-1 h-[1px] bg-white opacity-50 select-none"></div>
                <p className="text-white mx-4 text-opacity-70 select-none">
                  or
                </p>
                <div className="flex-1 h-[1px] bg-white opacity-50 select-none"></div>
              </div>

              <motion.div
                {...buttonClick}
                className="flex items-center justify-center px-6 md:px-20 py-2 cursor-pointer rounded-3xl md:gap-4 bg-transparent dark:hover:bg-gray-900 border-gray-400 border"
                onClick={loginWithGoogle}
              >
                <FcGoogle className="text-xl md:text-3xl" />
                <p className="capitalize text-sm text-white md:text-base select-none">
                  Continue with Google
                </p>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
