import React from "react";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import FullLayout from "../../layouts/FullLayout";

import { useUser } from "../../context/userContext";

const Documentation = () => {
  const { user } = useUser();
  const tableData = [
    {
      dataId: "192",
      network: "Airtel",
      size: "100.0 MB",
      duration: "7 days",
    },
    {
      dataId: "193",
      network: "Airtel",
      size: "300.0 MB",
      duration: "7 days",
    },
    {
      dataId: "194",
      network: "Airtel",
      size: "500.0 MB",
      duration: "30 days",
    },
    {
      dataId: "195",
      network: "Airtel",
      size: "100.0 MB",
      duration: "7 days",
    },
    {
      dataId: "196",
      network: "Airtel",
      size: "1.0 GB",
      duration: "30 days",
    },
    {
      dataId: "197",
      network: "Airtel",
      size: "2.0 GB",
      duration: "30 days",
    },
    {
      dataId: "198",
      network: "Airtel",
      size: "5.0 GB",
      duration: "30 days",
    },
    {
      dataId: "199",
      network: "Airtel",
      size: "10.0 GB",
      duration: "30 days",
    },
    {
      dataId: "200",
      network: "Airtel",
      size: "15.0 GB",
      duration: "30 days",
    },
    {
      dataId: "201",
      network: "Airtel",
      size: "20.0 GB",
      duration: "30 days",
    },
  ];

  return (
    <FullLayout>
      <div>
        <Button color="primary" className="mb-3 px-3">
          API Documentation page
        </Button>
        <div className="mb-2">
          <b>My Authorization Token:</b>
          <div>{user?.access_token}</div>
        </div>
        <div className="mb-4 text-muted" tag="h6">
          Overview of the Products
        </div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Data List</CardTitle>

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
