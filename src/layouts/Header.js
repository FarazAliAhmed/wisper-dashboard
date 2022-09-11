import React from "react";
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
} from "reactstrap";
import wisperSmall from "../assets/images/logos/wisper-white.png";
import user1 from "../assets/images/users/user1.jpg";
import { useUser } from "../context/userContext";

const Header = ({isAdmin}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const context = useUser();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color={isAdmin ? "danger": "primary"} dark expand="xs">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <img src={wisperSmall} width={80} alt="wisper logo" />
        </NavbarBrand>
        <Button
          color={isAdmin ? "danger": "primary"}
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
            <DropdownItem header>{context?.user?.username}</DropdownItem>
              <Link className="text-decoration-none text-dark" to={isAdmin ? "/admin" :"/dashboard"}>
            <DropdownItem className="text-dark">
                Dashboard
            </DropdownItem>
              </Link>
              <Link className="text-decoration-none text-dark" to={isAdmin ? "/admin/account" : "/account"}>
            <DropdownItem className="text-dark">
                Edit Account
            </DropdownItem>
              </Link>
            <DropdownItem divider />
              <Link className="text-decoration-none text-dark" to={isAdmin ? "/admin/allocate" : "/allocate"}>
            <DropdownItem className="text-dark">
                Allocate Data
            </DropdownItem>
              </Link>
              <Link className="text-decoration-none text-danger" to="/logout">
            <DropdownItem className="text-danger">
                Logout
            </DropdownItem>
              </Link>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
