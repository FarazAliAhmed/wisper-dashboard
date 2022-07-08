import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./../../assets/scss/custom.scss";

const SupportCard = () => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm="12" md="8" lg="9">
            <CardTitle tag="h5">Support Team</CardTitle>
            <p>
              Have anything to say to us? Please contact our Support Team on
              Whatsapp
            </p>
          </Col>
          <Col sm="12" md="4" lg="3" className="chat-btn">
            <Link
              to={{
                pathname: "https://wa.me/message/V5ZBZYUNYXSXC1",
              }}
              target="_blank"
            >
              <Button color="primary " className="btn-block">
                Chat with Us
              </Button>
            </Link>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SupportCard;
