import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./../../assets/scss/custom.scss";

const SupportCard = () => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm="12" md="12" lg="12">
            <CardTitle tag="h5">Contact Support</CardTitle>
            <p>Get in touch with our support team</p>
          </Col>
          <Col sm="12" md="12" lg="12" className="chat-btn">
            <a
              className="cursor-pointer"
              href="https://wa.me/2349041182322?text=I'm%20interested%20in%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="primary" className="btn-block">
                Send Message
              </Button>
            </a>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SupportCard;
