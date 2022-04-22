import React from "react";
import { Card, CardBody, CardTitle, Table, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";

const Business = () => {
  const { business } = useAdmin();

  return (
    <AdminLayout>
      <div>
        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h5">
              Mega Accounts
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
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {business.mega.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center py-2">
                        <Link
                          to={`/admin/business/${tdata._id}`}
                          className="text-decoration-none"
                        >
                          <h6 className="mb-0">{tdata.name}</h6>
                        </Link>
                      </div>
                    </td>
                    <td>{tdata.username}</td>
                    <td>{tdata.email}</td>
                    <td>{tdata.mobile_number}</td>
                    <td>{tdata.type}</td>
                    <td>{tdata.createdAt.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h5">
              Lite Accounts
            </CardTitle>

            <Table
              striped
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {business.lite.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center py-2">
                        <Link
                          to={`/admin/business/${tdata._id}`}
                          className="text-decoration-none"
                        >
                          <h6 className="mb-0">{tdata.name}</h6>
                        </Link>
                      </div>
                    </td>
                    <td>{tdata.username}</td>
                    <td>{tdata.email}</td>
                    <td>{tdata.mobile_number}</td>
                    <td>{tdata.createdAt.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Business;
