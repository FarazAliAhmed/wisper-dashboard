import React from "react";
import { Redirect } from "react-router-dom";

import { getCurrentUser } from "../../services/authService";
import LandingPage from "../Landing/LandingPage";

const Home = () => {
  const user = getCurrentUser();
  if (user && user.isAdmin) {
    return <Redirect to="/admin" />;
  } else if (user && !user.isAdmin) {
    return <Redirect to="/dashboard" />;
  } else {
    return <LandingPage />;
  }

};

export default Home;
