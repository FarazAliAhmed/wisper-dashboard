import React, { useState, useEffect } from "react";
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useAppState } from "../context/appContext";
import { useUser } from "../context/userContext";
import { displayBalance } from '../utils'

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

const adminNav = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "bi bi-house",
  },
  {
    title: "Business",
    href: "/admin/business",
    icon: "bi bi-person",
  },
  {
    title: "Wallets",
    href: "/admin/wallet",
    icon: "bi bi-cash",
  },
  {
    title: "Allocate Data",
    href: "/admin/allocate",
    icon: "bi bi-send",
  },
  {
    title: "Payments",
    href: "/admin/payment",
    icon: "bi bi-credit-card",
  },
  {
    title: "Transactions",
    href: "/admin/transaction",
    icon: "bi bi-cash-stack",
  },
  {
    title: "Credit & Debit",
    "href": "/admin/modify-account",
    icon: "bi bi-wrench"
  },
  {
    title: "Pricing",
    href: "/admin/pricing",
    icon: "bi bi-tags",
  },
  {
    title: "Account",
    href: "/admin/account",
    icon: "bi bi-person",
  },
  {
    title: "Logout",
    href: "/logout",
    icon: "bi bi-box-arrow-right",
  },
];

const Sidebar = ({isAdmin}) => {
  let location = useLocation();
  const [balanceDisplay, setBalanceDisplay] = useState("")
  const [nav, setNav] = useState(navigation)

  useEffect(() => {
    if(isAdmin){
      setNav(adminNav)
    }
  }, [isAdmin])

  const {
    currentBalance: {volume, unit, cash},
  } = useAppState();

  const {user} = useUser();

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  useEffect(()=>{
    setBalanceDisplay(displayBalance(volume, unit, cash, user))
  },[volume, unit, cash])

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
        Balance: {balanceDisplay}
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {nav.map((navi, index) => (
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
