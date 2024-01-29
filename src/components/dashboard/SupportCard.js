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
              href="mailto:support@wisper.ng?subject=Support Inquiry&body=Hello%20Wisper%20Support%2C%0D%0A%0D%0AI%20need%20assistance%20with%3A%0D%0A%0D%0A%0D%0AThank%20you%21"
              target="_blank"
            >
              <Button color="primary " className="btn-block">
                Send Message
              </Button>
            </a>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SupportCard;
