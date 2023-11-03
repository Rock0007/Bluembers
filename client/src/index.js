import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducers from "./context/reducers";

const myStore = createStore(
  myReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AnimatePresence>
        <Provider store={myStore}>
          <App />
        </Provider>
      </AnimatePresence>
    </Router>
  </React.StrictMode>
);
