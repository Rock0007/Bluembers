import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import {
  alertNULL,
  alertSuccess,
  alertWarning,
} from "../context/actions/alertActions";
import { useSelector, useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");

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

  const resetpassword = async () => {
    if (userEmail !== "") {
      try {
        await sendPasswordResetEmail(firebaseAuth, userEmail);
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {});
          }
        });
        dispatch(alertSuccess("Email Sent"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (
          errorCode === "auth/invalid-email" ||
          errorCode === "auth/user-not-found"
        ) {
          dispatch(alertWarning("Enter valid email"));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
        } else {
          console.error(
            `Password reset error - Code: ${errorCode}, Message: ${errorMessage}`
          );
        }
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      }
    } else {
      dispatch(alertWarning("Please enter your Email address"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <section className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium ml-1"
                  href="/login"
                >
                  Login here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        placeHolder={"Enter Email"}
                        type="email"
                        inputState={userEmail}
                        inputStateFunc={setUserEmail}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    {!userEmail && (
                      <p
                        className="text-xs text-blue-600 mt-2"
                        id="email-error"
                      >
                        Please include a valid email address so we can get back
                        to you
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    onClick={resetpassword}
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
