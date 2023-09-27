import React, { useState, useEffect } from "react";
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useAppState } from "../context/appContext";
import { useUser } from "../context/userContext";
import { useAdmin } from "../context/adminContext";
import { displayBalance } from "../utils";

// Businesses Navigation Bar
const liteNav = [
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
  // {
  //   title: "Buy Bulk Data",
  //   href: "/buyBulkData",
  //   icon: "bi bi-bag",
  // },
  // {
  //   title: "Account",
  //   href: "/account",
  //   icon: "bi bi-person",
  // },
  {
    title: "Packages",
    href: "/packages",
    icon: "bi bi-tags",
  },

  // {
  //   title: "Payments",
  //   href: "/payments",
  //   icon: "bi bi-credit-card",
  // },

  {
    title: "Wallet",
    href: "/monifyWallet",
    icon: "bi bi-wallet2",
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: "bi bi-cash-stack",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "bi bi-code-slash",
  },
  {
    title: "Logout",
    href: "/logout",
    icon: "bi bi-box-arrow-right",
  },
];

const subdealerNav = [
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
  // {
  //   title: "Buy Bulk Data",
  //   href: "/buyBulkData",
  //   icon: "bi bi-bag",
  // },

  // {
  //   title: "Wallet",
  //   href: "/monifyWallet",
  //   icon: "bi bi-wallet2",
  // },

  // {
  //   title: "Sub-Dealers",
  //   href: "/sub-dealers",
  //   icon: "bi bi-shop",
  // },
  // {
  //   title: "Account",
  //   href: "/account",
  //   icon: "bi bi-person",
  // },
  // {
  //   title: "Packages",
  //   href: "/packages",
  //   icon: "bi bi-tags",
  // },
  // {
  //   title: "Pricing",
  //   href: "/pricing",
  //   icon: "bi bi-tags",
  // },
  // {
  //   title: "Payments",
  //   href: "/payments",
  //   icon: "bi bi-credit-card",
  // },
  {
    title: "Transactions",
    href: "/transactions",
    icon: "bi bi-cash-stack",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "bi bi-code-slash",
  },
  {
    title: "Logout",
    href: "/logout",
    icon: "bi bi-box-arrow-right",
  },
];

const megaNav = [
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
    title: "Buy Bulk Data",
    href: "/buyBulkData",
    icon: "bi bi-bag",
  },

  {
    title: "Wallet",
    href: "/monifyWallet",
    icon: "bi bi-wallet2",
  },

  {
    title: "Sub-Dealers",
    href: "/sub-dealers",
    icon: "bi bi-shop",
  },
  // {
  //   title: "Account",
  //   href: "/account",
  //   icon: "bi bi-person",
  // },
  // {
  //   title: "Packages",
  //   href: "/packages",
  //   icon: "bi bi-tags",
  // },
  // {
  //   title: "Pricing",
  //   href: "/pricing",
  //   icon: "bi bi-tags",
  // },
  // {
  //   title: "Payments",
  //   href: "/payments",
  //   icon: "bi bi-credit-card",
  // },
  {
    title: "Transactions",
    href: "/transactions",
    icon: "bi bi-cash-stack",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "bi bi-code-slash",
  },
  {
    title: "Logout",
    href: "/logout",
    icon: "bi bi-box-arrow-right",
  },
];

// Admin Navigation Bar
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
  // {
  //   title: "Wallets",
  //   href: "/admin/wallet",
  //   icon: "bi bi-cash",
  // },
  {
    title: "Allocate Data",
    href: "/admin/allocate",
    icon: "bi bi-send",
  },

  {
    title: "Wallet Transactions",
    href: "/admin/walletTransactions",
    icon: "bi bi-wallet2",
  },
  {
    title: "Bulk Data History",
    href: "/admin/bulkDataHistory",
    icon: "bi bi-bag",
  },

  // {
  //   title: "Payments",
  //   href: "/admin/payment",
  //   icon: "bi bi-credit-card",
  // },
  {
    title: "Transactions",
    href: "/admin/transaction",
    icon: "bi bi-cash-stack",
  },
  {
    title: "Credit & Debit",
    href: "/admin/modify-account",
    icon: "bi bi-wrench",
  },

  // {
  //   title: "Packages",
  //   href: "/admin/packages",
  //   icon: "bi bi-tags",
  // },
  {
    title: "Glo Data Resolution",
    href: "/admin/gloRes",
    icon: "bi bi-wrench",
  },
  {
    title: "Wallet Resolution",
    href: "/admin/walletRes",
    icon: "bi bi-wrench",
  },
  {
    title: "Maintenance",
    href: "/admin/maintenance",
    icon: "bi bi-cone-striped",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "bi bi-code-slash",
  },
  // {
  //   title: "Account",
  //   href: "/admin/account",
  //   icon: "bi bi-person",
  // },
  {
    title: "Logout",
    href: "/logout",
    icon: "bi bi-box-arrow-right",
  },
];

const Sidebar = ({ isAdmin }) => {
  let location = useLocation();
  const [balanceDisplay, setBalanceDisplay] = useState("");
  const [nav, setNav] = useState([]);
  const [adminBalance, setAdminBalance] = useState({
    mtn_balance: "",
    airtel_balance: "",
  });
  const { user } = useUser();

  useEffect(() => {
    if (isAdmin) {
      setNav(adminNav);
    } else {
      if (user.type == "mega") {
        setNav(megaNav);
      } else if (user.type == "subdealer") {
        setNav(subdealerNav);
      } else {
        setNav(liteNav);
      }
    }
  }, [isAdmin]);

  const {
    currentBalance: { volume, unit, cash, mega_wallet },
  } = useAppState();

  const adminContext = useAdmin();
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  useEffect(() => {
    setBalanceDisplay(displayBalance(volume, unit, cash, mega_wallet, user));
  }, [volume, unit, cash]);

  return (
    <div className="p-3">
      <div className="d-flex align-items-center justify-content-between">
        <Logo />
        <span className="d-md-none">
          <Button
            close
            size="sm"
            className="ms-auto"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      {
        // user && user.isAdmin ?
        // <>
        //   <div className="mt-2 text-muted fw-bold">SS.1 ~ {!!adminContext ? adminContext.mainBalance.simserver : ""} ₦</div>
        //   <div className="mt-2 text-muted fw-bold">FL.1 ~ {!!adminContext ? adminContext.mainBalance.mtn_balance : ""} MB</div>
        //   <div className="mt-2 text-muted fw-bold">FL.2 ~ {!!adminContext ? adminContext.mainBalance.airtel_balance : ""} MB</div>
        // </> : <>
        // <div></div>
        // {/* <div className="mt-2 text-muted fw-bold">TOTAL: {balanceDisplay}</div> */}
        // </>
      }
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
