import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.js";
import AdminProtectedRoute from "../components/AdminProtectedRoute.js";
import Loader from "../layouts/loader/Loader.js";
import ForgotPassword from "../views/auth/ForgotPassword.jsx";
import SetPassword from "../views/auth/SetPassword.jsx";
import CheckEmail from "../views/auth/CheckEmail.jsx";
import CheckEmailConfirm from "../views/auth/CheckEmailConfirm.jsx";
import ConfirmEmail from "../views/auth/ConfirmEmail.jsx";
import PricingUser from "../components/pages/PricingUser.js";
import { useUser } from "../context/userContext.js";
import AllocateDataMA from "../views/ui/AllocateDataMA.js";

/***** Pages ****/

const Home = lazy(() => import("../views/Home"));
const NotFound = lazy(() => import("../views/NotFound"));
const Login = lazy(() => import("../views/auth/Login.js"));
const Logout = lazy(() => import("../views/auth/Logout"));
const Register = lazy(() => import("../views/auth/Register"));
const Dashboard = lazy(() => import("../views/ui/Dashboard.js"));
const AllocateData = lazy(() => import("../views/ui/AllocateData"));
const BuyBulkData = lazy(() => import("../views/ui/BuyBulkData"));
const MegaFunding = lazy(() => import("../views/ui/MegaFunding"));
const Wallet = lazy(() => import("../views/ui/Wallet"));
const Account = lazy(() => import("../views/ui/Account"));
const Documentation = lazy(() => import("../views/ui/Documentation"));
const Payments = lazy(() => import("../views/ui/Payments"));
const Transactions = lazy(() => import("../views/ui/Transactions"));
const Pricing = lazy(() => import("../views/ui/Pricing"));
const ViewPricing = lazy(() => import("../views/ui/ViewPricing"));
const Admin = lazy(() => import("./Admin"));
const TransactionsV2 = lazy(() => import("../views/ui/TransactionsV2"));

const Routes = () => {
  const { user } = useUser();

  // console.log("user router", user)

  return (
    <Router>
      <Suspense fallback={<Loader isLoading={true} />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <AdminProtectedRoute path="/admin" component={Admin} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          {/* <ProtectedRoute path="/packages/:id" component={Pricing} /> */}
          <ProtectedRoute path="/packages" component={ViewPricing} />
          {user?.type == "mega" ? (
            <ProtectedRoute path="/allocate" component={AllocateDataMA} />
          ) : (
            <ProtectedRoute path="/allocate" component={AllocateData} />
          )}
          {user?.type == "mega" && (
            <ProtectedRoute path="/megaFunding" component={MegaFunding} />
          )}
          {user?.type == "mega" && (
            <ProtectedRoute path="/buyBulkData" component={BuyBulkData} />
          )}
          <ProtectedRoute path="/wallet" component={Wallet} />
          <ProtectedRoute path="/account" component={Account} />
          <ProtectedRoute path="/payments" component={Payments} />
          {/* <ProtectedRoute path="/transactions" component={Transactions} /> */}
          <ProtectedRoute path="/transactions" component={TransactionsV2} />
          <ProtectedRoute path="/developers" component={Documentation} />
          <ProtectedRoute path="/logout" component={Logout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/check-email/:email" component={CheckEmail} />
          <Route
            exact
            path="/check-email-confirm/:email"
            component={CheckEmailConfirm}
          />
          <Route exact path="/confirm-email" component={ConfirmEmail} />
          <Route
            exact
            path="/reset-password/:email/:token"
            component={SetPassword}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
