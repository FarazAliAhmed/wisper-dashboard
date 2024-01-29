import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdmin } from "../../context/adminContext";

const Business = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { business, admins } = useAdmin();

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);

    const allBusiness = [...business.mega, ...business.lite];

    if (e.target.value === "") return setSearchResults([]);

    const results = allBusiness.filter(
      (business) =>
        business.email.includes(val) ||
        business.username.includes(val) ||
        business._id.includes(val)
    );

    setSearchResults(results);
  };

  return (
    <AdminLayout>
      <div>
        <Row className="justify-content-center mt-4">
          <Col lg="4" sm="6">
            <FormGroup>
              <Input
                onChange={handleChange}
                value={searchValue}
                name="search"
                placeholder="Search"
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>

        {searchResults.length > 0 && (
          <Card className="mb-3">
            <CardBody>
              <Row className="justify-content-center align-items-center">
                <Col>
                  <CardText className="text-muted" tag="h6">
                    {searchResults.length} Search Result(s)
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}

        {searchResults.length === 0 && (
          <Card className="mt-4">
            <CardBody>
              <CardTitle className="text-center" tag="h5">
                Admin Accounts
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
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Type</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>{index}</td>
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
        )}

        {searchResults.length > 0 && (
          <Card>
            <CardBody>
              <CardTitle className="text-center" tag="h5">
                Results
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
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Type</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>{index}</td>
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
        )}

        {searchResults.length === 0 && (
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
                    <th>S/N</th>
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
                      <td>{index}</td>
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
        )}

        {searchResults.length === 0 && (
          <Card>
            <CardBody>
              <CardTitle className="text-center" tag="h5">
                Agents Accounts
              </CardTitle>

              <Table
                striped
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {business.agent.map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>{index}</td>
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
        )}

        {searchResults.length === 0 && (
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
                    <th>S/N</th>
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
                      <td>{index}</td>
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
        )}
      </div>
    </AdminLayout>
  );
};

export default Business;
