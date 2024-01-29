import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./../../assets/scss/custom.scss";

const UserGuide = () => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm="12" md="12" lg="12">
            <CardTitle tag="h5">User Guide Download</CardTitle>
            <p>Learn How to Navigate and Utilize the Wisper Platform</p>
          </Col>
          <Col sm="12" md="12" lg="12" className="chat-btn">
            <a
              className="cursor-pointer"
              href="https://docs.google.com/document/d/1i3bljCeFRYr9Afd_I0UkDIOfiOORTvfS/edit?usp=sharing&ouid=117079378487353153089&rtpof=true&sd=true"
              download="UserGuide.pdf"
              target="_blank"
              style={{
                textDecoration: "none",
              }}
            >
              <Button color="primary " className="btn-block">
                Download Guide
              </Button>
            </a>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserGuide;
