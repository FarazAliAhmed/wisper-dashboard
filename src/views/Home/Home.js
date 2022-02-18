import React from "react";
import { Redirect } from "react-router-dom";
import { Container } from "reactstrap";

import authService from "../../services/authService";
import Navigation from "../../components/Navigation";

import "./home.scss";

const Home = () => {
  if (authService.getCurrentUser()) return <Redirect to="/dashboard" />;

  return (
    <div className="home-wrapper">
      <Container fluid>
        <Navigation />
      </Container>
    </div>
  );
};

export default Home;
