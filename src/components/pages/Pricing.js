import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table, CardSubtitle } from "reactstrap";
import { parseDataPlans } from "../../utils";
import { useAppState } from "../../context/appContext";

import tableData, { tableDataWhole } from "../../utils/plansTable";
import { useUser } from "../../context/userContext";
import packImg from "../../assets/images/users/packages.svg";

// import FullLayout from "../../layouts/FullLayout";
// import { useUser } from "../../context/userContext";
// const tableDataAll = [...tableData];

const Pricing = () => {
  const { plansUser, plans } = useAppState();
  const [tableDataAll, setTableDataAll] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    if (user?.isAdmin) {
      setTableDataAll(plans);
    } else {
      setTableDataAll(plansUser);
    }
  }, [user]);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="text-center" tag="h5">
            Data Plans and Pricing
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
              {plansUser.length != 0 && (
                <tr>
                  {/* <th>Price</th> */}
                  {/* <th>Amount</th> */}

                  <th>Network</th>
                  <th>Size </th>
                  <th>Validity</th>
                  {!user?.isAdmin && <th>Price (₦)</th>}
                  {/* <th>Plan Type</th> */}
                </tr>
              )}
            </thead>
            <tbody>
              {tableDataAll
                ?.sort((a, b) => a["network"].localeCompare(b["network"]))
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
                    <td>{tdata.validity}</td>
                    {!user?.isAdmin && <td>₦{tdata.price}</td>}
                    {/* <td>{tdata.plan_type.toUpperCase()}</td> */}
                  </tr>
                ))}
            </tbody>
          </Table>
          {plansUser.length == 0 && (
            <div className="col-12 flex text-center px-4 pb-4">
              <img src={packImg} style={{ width: "200px" }} />

              <h5 className="mb-4">
                Apologies for any confusion. We are currently in the process of
                setting up data pricing for your account. Please check back
                shortly for the updated pricing information. Thank you
                for your patience.
              </h5>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Pricing;
