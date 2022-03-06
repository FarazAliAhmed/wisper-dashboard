import React from "react";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import FullLayout from "../../layouts/FullLayout";

import { useUser } from "../../context/userContext";

const docs = "https://documenter.getpostman.com/view/17453703/UVksMZmU"

const Documentation = () => {
  const { user } = useUser();
  
  // const tableData_old = [
  //   {
  //     dataId: "257",
  //     network: "Airtel",
  //     size: "100.0 MB",
  //     duration: "7 days",
  //   },
  //   {
  //     dataId: "258",
  //     network: "Airtel",
  //     size: "300.0 MB",
  //     duration: "7 days",
  //   },
  //   {
  //     dataId: "253",
  //     network: "Airtel",
  //     size: "500.0 MB",
  //     duration: "30 days",
  //   },
  //   {
  //     dataId: "254",
  //     network: "Airtel",
  //     size: "1.0 GB",
  //     duration: "30 days",
  //   },
  //   {
  //     dataId: "255",
  //     network: "Airtel",
  //     size: "2.0 GB",
  //     duration: "30 days",
  //   },
  //   {
  //     dataId: "256",
  //     network: "Airtel",
  //     size: "5.0 GB",
  //     duration: "30 days",
  //   },
  //   // {
  //   //   dataId: "199",
  //   //   network: "Airtel",
  //   //   size: "10.0 GB",
  //   //   duration: "30 days",
  //   // },
  //   // {
  //   //   dataId: "200",
  //   //   network: "Airtel",
  //   //   size: "15.0 GB",
  //   //   duration: "30 days",
  //   // },
  //   // {
  //   //   dataId: "201",
  //   //   network: "Airtel",
  //   //   size: "20.0 GB",
  //   //   duration: "30 days",
  //   // },
  // ];


const tableData = [
 {
   "dataId": 221,
   "network": "airtel",
   "size": "500.0 mb",
   "duration": "monthly"
 },
 {
   "dataId": 222,
   "network": "airtel",
   "size": "1.0 gb",
   "duration": "monthly"
 },
 {
   "dataId": 223,
   "network": "airtel",
   "size": "2.0 gb",
   "duration": "monthly"
 },
 {
   "dataId": 224,
   "network": "airtel",
   "size": "5.0 gb",
   "duration": "monthly"
 },
 {
   "dataId": 225,
   "network": "airtel",
   "size": "100.0 mb",
   "duration": "7 days"
 },
 {
   "dataId": 226,
   "network": "airtel",
   "size": "300.0 mb",
   "duration": "7 days"
 }
]

  return (
    <FullLayout>
      <div>
        <a href={docs} target="_blank" rel="noreferrer" >
          <Button color="primary" className="mb-3 px-3">
            API Documentation page
          </Button>
        </a>
        <div className="mb-2">
          <b>My Authorization Token:</b>
          <div className="text-muted p-3">{user?.access_token}</div>
        </div>

        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h5">
              Data List
            </CardTitle>

            <Table
              striped
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  <th>Data ID</th>
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
                        <h6 className="mb-0">{tdata.dataId}</h6>
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

export default Documentation;
