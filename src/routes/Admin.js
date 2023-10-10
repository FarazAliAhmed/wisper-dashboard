import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Loader from "../layouts/loader/Loader.js";

import AdminProtectedRoute from "../components/AdminProtectedRoute.js";
import AdminProvider from "../context/adminContext";
import Login from "../views/auth/Login.js";
import PricingUser from "../components/pages/PricingUser.js";
import ViewPricing from "../views/admin/ViewPricing.js";
import Settings from "../views/admin/Settings.Admin.js";
import AllocateDataMA from "../views/ui/AllocateDataMA.js";
import AllocateDataMAdmin from "../views/ui/AllocateDataMAdmin.js";
const AgentsBusinessDetails = lazy(() =>
  import("../views/ui/BusinessDetails.Agents.js")
);

const Home = lazy(() => import("../views/Home"));
const Logout = lazy(() => import("../views/auth/Logout"));
const Dashboard = lazy(() => import("../views/admin/Dashboard.Admin"));
const WalletTransaction = lazy(() =>
  import("../views/admin/WalletTransaction.admin.js")
);
const BulkDataHistory = lazy(() =>
  import("../views/admin/BulkDataHistory.admin.js")
);
const CreditAndDebit = lazy(() =>
  import("../views/admin/CreditAndDebit.Admin")
);
const Allocate = lazy(() => import("../views/admin/AllocateData.Admin"));
const Maintenance = lazy(() => import("../views/admin/Maintenance.Admin.js"));
const Business = lazy(() => import("../views/admin/Business.Admin"));
const BusinessDetails = lazy(() =>
  import("../views/admin/BusinessDetails.Admin")
);
const Payments = lazy(() => import("../views/admin/Payments.Admin"));
const Pricing = lazy(() => import("../views/admin/Pricing.Admin"));
const GloDataResolution = lazy(() =>
  import("../views/admin/GloDataResolution.Admin.js")
);

const WalletResolution = lazy(() =>
  import("../views/admin/WalletResolution.Admin.js")
);
const UpdateMegaPrice = lazy(() =>
  import("../views/admin/UpdateMegaPrice.Admin")
);
const Transactions = lazy(() => import("../views/admin/Transactions.Admin"));
const Wallet = lazy(() => import("../views/admin/Wallet.Admin"));
const Account = lazy(() => import("../views/admin/Account.Admin"));
const Documentation = lazy(() => import("../views/admin/Documentation.Admin"));
const TransactionsV2 = lazy(() =>
  import("../views/admin/TransactionsV2.Admin")
);

const AdminRoutes = () => {
  return (
    <>
      <AdminProvider>
        <Router>
          <Suspense fallback={<Loader isLoading={true} />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <AdminProtectedRoute exact path="/admin" component={Dashboard} />
              <AdminProtectedRoute
                exact
                path="/admin/business/:businessId"
                component={BusinessDetails}
              />
              <AdminProtectedRoute
                exact
                path="/admin/business"
                component={Business}
              />

              <AdminProtectedRoute
                exact
                path="/admin/settings"
                component={Settings}
              />

              <AdminProtectedRoute
                exact
                path="/admin/maintenance"
                component={Maintenance}
              />
              <AdminProtectedRoute
                path="/admin/modify-account"
                component={CreditAndDebit}
              />
              <AdminProtectedRoute
                path="/admin/allocate"
                component={AllocateDataMAdmin}
              />
              <AdminProtectedRoute path="/admin/payment" component={Payments} />
              <AdminProtectedRoute
                path="/admin/user_packages/:id"
                component={Pricing}
              />
              <AdminProtectedRoute
                path="/admin/updateMegaPrice/:id"
                component={UpdateMegaPrice}
              />
              <AdminProtectedRoute
                path="/admin/packages"
                component={ViewPricing}
              />
              <AdminProtectedRoute
                path="/admin/gloRes"
                component={GloDataResolution}
              />
              <AdminProtectedRoute
                path="/admin/walletRes"
                component={WalletResolution}
              />
              <AdminProtectedRoute
                path="/admin/developers"
                component={Documentation}
              />
              <AdminProtectedRoute
                path="/admin/walletTransactions"
                component={WalletTransaction}
              />
              <AdminProtectedRoute
                path="/admin/agents/business/:businessId"
                component={AgentsBusinessDetails}
              />
              <AdminProtectedRoute
                path="/admin/bulkDataHistory"
                component={BulkDataHistory}
              />
              <AdminProtectedRoute path="/admin/wallet" component={Wallet} />
              <AdminProtectedRoute
                path="/admin/transaction"
                component={TransactionsV2}
              />
              <AdminProtectedRoute path="/admin/account" component={Account} />
              <AdminProtectedRoute exact path="/login" component={Login} />
              <AdminProtectedRoute path="/logout" component={Logout} />
            </Switch>
          </Suspense>
        </Router>
      </AdminProvider>
    </>
  );
};

export default AdminRoutes;
