import React from "react";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import FullLayout from "../../layouts/FullLayout";

import { useUser } from "../../context/userContext";

const Pricing = () => {
  const { user } = useUser();


const tableData = [
  {
    "network": "airtel",
    "size": "100.0 mb",
    "duration": "7 days",
    "amount": "₦50"
  },
  {
    "network": "airtel",
    "size": "300.0 mb",
    "duration": "7 days",
    "amount": "₦100"
  },
 {
   "network": "airtel",
   "size": "500.0 mb",
   "duration": "monthly",
   "amount": "₦180"
 },
 {
   "network": "airtel",
   "size": "1.0 gb",
   "duration": "monthly",
   "amount": "₦350"
 },
 {
   "network": "airtel",
   "size": "2.0 gb",
   "duration": "monthly",
   "amount": "₦700"
 },
 {
   "network": "airtel",
   "size": "5.0 gb",
   "duration": "monthly",
   "amount": "₦1700"
 },
]

  return (
    <FullLayout>
      <div>
        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h5">
              Price List
            </CardTitle>

            <Table
              striped
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Network</th>

                  {/* <th>Amount</th> */}
                  <th>Size </th>
                  <th>Validity</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center py-2">
                        <h6 className="mb-0">{tdata.amount}</h6>
                      </div>
                    </td>
                    <td>{tdata.network}</td>
                    {/* <td>{tdata.amount}</td> */}
                    <td>{tdata.size}</td>
                    <td>{tdata.duration}</td>
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
