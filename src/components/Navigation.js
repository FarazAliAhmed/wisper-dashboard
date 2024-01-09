import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  // NavItem,
  // NavLink,
  Button,
} from "reactstrap";
import wisperLogo from "../assets/images/logos/wisper.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="m-auto">
      <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">
          <img src={wisperLogo} width={100} alt="wisper" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <div className="pt-4 mt-2">
            <Nav
              vertical
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              className="sidebarNav"
            >
              <Link to="/login">
                <Button color="info">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="btn" outline color="secondary">
                  Register
                </Button>
              </Link>
            </Nav>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
