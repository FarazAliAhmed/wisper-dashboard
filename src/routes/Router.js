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

/***** Pages ****/

const Home = lazy(() => import("../views/Home"));
const NotFound = lazy(() => import("../views/NotFound"));
const Login = lazy(() => import("../views/auth/Login.js"));
const Logout = lazy(() => import("../views/auth/Logout"));
const Register = lazy(() => import("../views/auth/Register"));
const Dashboard = lazy(() => import("../views/ui/Dashboard.js"));
const AllocateData = lazy(() => import("../views/ui/AllocateData"));
const Wallet = lazy(() => import("../views/ui/Wallet"));
const Account = lazy(() => import("../views/ui/Account"));
const Documentation = lazy(() => import("../views/ui/Documentation"));
const Payments = lazy(() => import("../views/ui/Payments"));
const Transactions = lazy(() => import("../views/ui/Transactions"));
const Pricing = lazy(() => import("../views/ui/Pricing"));
const Admin = lazy(() => import("./Admin"));
const TransactionsV2 = lazy(() => import('../views/ui/TransactionsV2'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<Loader isLoading={true} />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <AdminProtectedRoute path="/admin" component={Admin} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/packages" component={Pricing} />
          <ProtectedRoute path="/allocate" component={AllocateData} />
          <ProtectedRoute path="/wallet" component={Wallet} />
          <ProtectedRoute path="/account" component={Account} />
          <ProtectedRoute path="/payments" component={Payments} />
          {/* <ProtectedRoute path="/transactions" component={Transactions} /> */}
          <ProtectedRoute path="/transactions" component={TransactionsV2} />
          <ProtectedRoute path="/developers" component={Documentation} />
          <ProtectedRoute path="/logout" component={Logout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
