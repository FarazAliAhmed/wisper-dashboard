import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Container, Button } from "reactstrap";

import { getCurrentUser } from "../../services/authService";
import Navigation from "../../components/Navigation";

import "./home.scss";

const Home = () => {
  const user = getCurrentUser();
  if (user && user.isAdmin) {
    return <Redirect to="/admin" />;
  } else if (user && !user.isAdmin) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home-wrapper">
      <Container fluid>
        <Navigation />
      </Container>
      <div className="hero">
        <header className="pb-4 text-center">
          <h1>Automated Solution for Data Resellers</h1>
          <p>
            Enjoy easy integration, Cheap rates and fast data allocation with
            Wisper reseller API.
          </p>
          <Link to="/register">
            <Button color="info" className="get-started">
              GET STARTED
            </Button>
          </Link>
        </header>
      </div>
    </div>
  );
};

export default Home;
