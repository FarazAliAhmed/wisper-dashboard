import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/style.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
