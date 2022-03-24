import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";

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
          <Col sm="12" md="4" lg="3">
            <Button color="primary " className="btn-block">
              Whatsapp Us
            </Button>
            <Button color="primary" className="mt-2 btn-block">
              Join Our Whatsapp Group
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SupportCard;
