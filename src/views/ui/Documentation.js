import React from "react";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import FullLayout from "../../layouts/FullLayout";
import tableData from '../../utils/plansTable'
import { useUser } from "../../context/userContext";

const docs = "https://documenter.getpostman.com/view/17453703/UVksMZmU"


const Documentation = () => {
  const { user } = useUser();

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
