import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import App from "./App";  
import { BrowserRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";

ReactDOM.render(
  <React.StrictMode>
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
  </React.StrictMode>,

  document.getElementById("root")
);

