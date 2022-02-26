import { Col, Row } from "reactstrap";
// import SalesChart from "../../components/dashboard/SalesChart";
// import Feeds from "../../components/dashboard/Feeds";
// import ProjectTables from "../../components/dashboard/ProjectTable";
import TopCards from "../../components/dashboard/TopCards";
import FullLayout from "../../layouts/FullLayout";
import { useAppState } from "../../context/appContext";
import { totalDataSold } from "../../utils";

import "../../assets/scss/custom.scss";
import sterling_logo from "../../assets/images/logos/Sterling_Bank_Logo_Straight.png"

const Dashboard = () => {
  const {
    currentBalance: { volume, unit },
    transactions,
  } = useAppState();

  return (
    <FullLayout>
      <div>
        {/***Top Cards***/}
        <Row>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-success text-success"
              title="Profit"
              subtitle="Balance"
              earning={`${volume} ${unit}`}
              icon="bi bi-wallet"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-danger text-danger"
              title="Refunds"
              subtitle="Total transactions "
              earning={`${transactions.length}`}
              icon="bi bi-coin"
            />
          </Col>
          <Col sm="6" lg="4">
            <TopCards
              bg="bg-light-warning text-warning"
              title="New Project"
              subtitle="Total data sold"
              earning={totalDataSold(transactions)}
              icon="bi bi-basket3"
            />
          </Col>
        </Row>
        {/***Sales & Feed***/}
        {/* <Row>
          <Col sm="6" lg="6" xl="7" xxl="8">
            <SalesChart />
          </Col>
          <Col sm="6" lg="6" xl="5" xxl="4">
            <Feeds />
          </Col>
        </Row> */}
        {/***Table ***/}
        <Row className="bank-details">
          <Col>
            <div>
              <img className="sterling__logo" src={sterling_logo} />
            </div>
            <div>
              <b>Bank:</b> &nbsp; Sterling Bank
            </div>
            <div>
              <b>Account Number:</b>&nbsp; 0014602073
            </div>
            <div>
              <b>Account Name:</b> &nbsp; Alma Management Limited
            </div>
          </Col>
        </Row>
      </div>
    </FullLayout>
  );
};

export default Dashboard;
