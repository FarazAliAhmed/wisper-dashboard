import React from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { Link } from "react-router-dom";
import xtLogo from "../assets/images/logos/xt-logo.jpg";

function AuthLayout({ headTitle, tagline, children }) {
  return (
    <Container>
      <Row>
        <Col className="mx-auto text-center mt-5">
          <Link to="/">
            <img src={xtLogo} alt="XT logo" style={{ width: "300px", height: "auto", maxWidth: "90%" }} />
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="mx-auto mb-5" sm="9" md="7" lg="5">
          <Card body className="p-5 mb-5 mt-3 card-wrap">
            <header className="pb-4 text-center">
              <h4>{headTitle}</h4>
              <small className="text-muted">{tagline}</small>
            </header>

            {children}
          
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthLayout;
