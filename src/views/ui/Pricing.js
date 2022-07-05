import React from "react";
import { Card, CardBody, CardTitle, Table, CardSubtitle } from "reactstrap";
import FullLayout from "../../layouts/FullLayout";
import tableData, { tableDataWhole } from "../../utils/plansTable";
import { parseDataPlans } from "../../utils"
// import { useUser } from "../../context/userContext";
import { useAppState } from "../../context/appContext"


// const tableDataAll = [...tableData];

const Pricing = () => {
  // const { user } = useUser();
  const { plans } = useAppState()
  const tableDataAll = parseDataPlans(plans);

  return (
    <FullLayout>
      <div>
        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h5">
              Retail Packages
            </CardTitle>
            {/*      <CardSubtitle
              className="mb-2 d-block text-danger text-center"
              tag="small"
            >
              MTN Gifting Data Plans are unavailable for now!
            </CardSubtitle> */}

            <Table
              striped
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  {/* <th>Price</th> */}
                  {/* <th>Amount</th> */}

                  <th>Network</th>
                  <th>Size </th>
                  <th>Validity</th>
                  <th>Plan Type</th>
                </tr>
              </thead>
              <tbody>
                {tableDataAll
                  .sort((a, b) => a['network'].localeCompare(b['network']))
                  .map((tdata, index) => (
                  <tr key={index} className="border-top">
                    {/* <td>
                      <div className="d-flex align-items-center py-2">
                        <h6 className="mb-0">{tdata.amount}</h6>
                      </div>
                    </td> */}
                    {/* <td>{tdata.amount}</td> */}
                    <td>{tdata.network.toUpperCase()}</td>
                    <td>{tdata.size}</td>
                    <td>{tdata.duration}</td>
                    <td>{tdata.plan_type.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h5">
              WholeSale Packages
            </CardTitle>
            {/*  <CardSubtitle
              className="mb-2 d-block text-danger text-center"
              tag="small"
            >
              MTN Gifting Data Plans are unavailable for now!
            </CardSubtitle> */}

            <Table
              striped
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  {/* <th>Price</th> */}
                  {/* <th>Amount</th> */}

                  <th>Network</th>
                  <th>Package </th>
                  <th>Purchase Range</th>
                  <th>Plan Type</th>
                </tr>
              </thead>
              <tbody>
                {tableDataWhole
                  .sort((a, b) => a['network'].localeCompare(b['network']))
                  .map((tdata, index) => (
                  <tr key={index} className="border-top">
                    {/* <td>
                      <div className="d-flex align-items-center py-2">
                        <h6 className="mb-0">{tdata.price}</h6>
                      </div>
                    </td> */}
                    {/* <td>{tdata.amount}</td> */}
                    <td>{tdata.network.toUpperCase()}</td>
                    <td>{tdata.package}</td>
                    <td>{tdata.purchase_range}</td>
                    <td>{tdata.plan_type.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </FullLayout>
  );
};

export default Pricing;
