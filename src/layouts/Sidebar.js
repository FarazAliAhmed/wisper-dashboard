import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useAppState } from "../context/appContext";
import { useUser } from "../context/userContext";
import {formatDataToNaira} from "../utils/index"

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-house",
  },
  // {
  //   title: "Buy Data",
  //   href: "/allocate-data",
  //   icon: "bi bi-reception-4",
  // },
  // {
  //   title: "Fund Wallet",
  //   href: "/wallet",
  //   icon: "bi bi-wallet",
  // },
  {
    title: "Allocate Data",
    href: "/allocate",
    icon: "bi bi-send",
  },
  {
    title: "Account",
    href: "/account",
    icon: "bi bi-person",
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: "bi bi-tags",
  },
  {
    title: "Payments",
    href: "/payments",
    icon: "bi bi-credit-card",
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: "bi bi-cash-stack",
  },
  {
    title: "Developer's API",
    href: "/developers",
    icon: "bi bi-code-slash",
  },
  {
    title: "Logout",
    href: "/logout",
    icon: "bi bi-box-arrow-right",
  },
];

const Sidebar = () => {
  const {
    currentBalance: { volume, unit, cash },
  } = useAppState();

  const {user} = useUser();
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="mt-2 text-muted fw-bold">
        {/* Balance: {volume} {unit} */}
        Balance: {user?.type === "mega" ? `${volume}`.split(".")[0] + ` ${unit}` : ` ${unit}` + `${cash}`.split(".")[0]}
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
