import { Col, Row } from "reactstrap";
// import SalesChart from "../../components/dashboard/SalesChart";
// import Feeds from "../../components/dashboard/Feeds";
import ProjectTables from "../../components/dashboard/ProjectTable";
import TopCards from "../../components/dashboard/TopCards";
import FullLayout from "../../layouts/FullLayout";
import { useAppState } from "../../context/appContext";
import { totalDataSold } from "../../utils";

import "../../assets/scss/custom.scss";

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
              <b>Account Number:</b>&nbsp; 12345678899
            </div>
            <div>
              <b>Account Name:</b> &nbsp; Wisper NG
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <ProjectTables />
          </Col>
        </Row>
      </div>
    </FullLayout>
  );
};

export default Dashboard;
