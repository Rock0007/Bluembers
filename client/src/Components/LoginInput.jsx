// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { fadeInOut } from "../Animations";

// const LoginInput = ({
//   placeHolder,
//   icon,
//   inputState,
//   inputStateFunc,
//   type,
//   isSignUp,
// }) => {
//   const [isFocus, setIsFocus] = useState(false);

//   const handleInputFocus = () => {
//     setIsFocus(true);
//   };

//   const handleInputBlur = () => {
//     setIsFocus(false);
//   };

//   return (
//     <motion.div
//       {...fadeInOut}
//       // className={`flex items-center justify-center gap-4 rounded-md w-full px-4 py-2 ${
//       //   isFocus ? "shadow-md shadow-blue-900" : "shadow-none"
//       // }`}
//       // style={{
//       //   backdropFilter: "blur(100px)",
//       //   backgroundColor: "#c3cbdc",
//       //   backgroundImage: "linear-gradient(147deg, #c3cbdc 0%, #edf1f4 100%)",
//       // }}
//     >
//       {icon}
//       <input
//         type={type}
//         placeholder={placeHolder}
//         // className="w-full h-full bg-transparent border-none outline-none"
//         style={{
//           fontSize: "15px",
//           color: "#000000",
//         }}
//         value={inputState}
//         onChange={(e) => inputStateFunc(e.target.value)}
//         onFocus={handleInputFocus}
//         onBlur={handleInputBlur}
//         class="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         required=""
//       />
//     </motion.div>
//   );
// };

// export default LoginInput;
