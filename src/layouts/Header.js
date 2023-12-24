import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import wisperSmall from "../assets/images/logos/wisper-white.png";
import user1 from "../assets/images/users/user1.jpg";
import { useUser } from "../context/userContext";
import warning from "../assets/images/logos/warning.png";

const Header = ({ isAdmin }) => {
  const [confirm, setConfirm] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const context = useUser();

  useEffect(() => {
    if (context?.user?.type == "mega" && context?.user?.isAdmin == true) {
      setType("Admin");
    } else if (
      context?.user?.type == "mega" &&
      context?.user?.isAdmin == false
    ) {
      setType("Dealer");
    } else if (context?.user?.type == "agent") {
      setType("Agent");
    } else if (context?.user?.type == "lite") {
      setType("Lite");
    } else if (context?.user?.type == "glo_dealer") {
      setType("Glo Dealer");
    } else if (context?.user?.type == "glo_agent") {
      setType("Glo Agent");
    }
  }, []);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color={isAdmin ? "danger" : "primary"} dark expand="xs">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <img src={wisperSmall} width={80} alt="wisper logo" />
        </NavbarBrand>
        <Button
          color={isAdmin ? "danger" : "primary"}
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      {/* <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div> */}

      <Collapse navbar isOpen={isOpen}>
        <span className="me-auto"></span>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <div className="text-decoration-none text-dark">
              <DropdownItem className="text-dark">Wisper - {type}</DropdownItem>
            </div>

            <DropdownItem divider />
            <Link
              className="text-decoration-none text-dark"
              to={isAdmin ? "/admin" : "/dashboard"}
            >
              <DropdownItem className="text-dark">Dashboard</DropdownItem>
            </Link>
            <Link
              className="text-decoration-none text-dark"
              to={isAdmin ? "/admin/account" : "/settings"}
            >
              <DropdownItem className="text-dark">Settings</DropdownItem>
            </Link>
            <Link
              className="text-decoration-none text-dark"
              to={isAdmin ? "/admin/allocate" : "/allocate"}
            >
              <DropdownItem className="text-dark">Allocate Data</DropdownItem>
            </Link>
            <DropdownItem divider />

            <DropdownItem
              onClick={() => {
                setConfirm(true);
              }}
              className="text-danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
      <Modal centered isOpen={confirm} toggle={() => setConfirm(!confirm)}>
        <ModalBody>
          <div className="confirm text-center">
            <img src={warning} width={50} className="confirm-warn" alt="warn" />

            <h6>
              Are you sure you want to logout of your account? if you log out,
              you will need to enter your credentials to access your account
              again
            </h6>
          </div>
        </ModalBody>
        <ModalFooter className="confirm-footer">
          <Button
            color="primary"
            onClick={() => {
              setConfirm(false);
            }}
          >
            <Link className="text-decoration-none text-white" to="/logout">
              Yes, Log Out
            </Link>
          </Button>{" "}
          <Button onClick={() => setConfirm(false)}>No, Stay Logged In</Button>
        </ModalFooter>
      </Modal>
    </Navbar>
  );
};

export default Header;
