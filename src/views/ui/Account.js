import { Card, CardText, CardTitle, Button, Row, Col } from "reactstrap";

import FullLayout from "../../layouts/FullLayout";

const Account = () => {
  return (
    <FullLayout>
      <div>
        <Row>
          <h5 className="mb-3 mt-3">Alignment Text</h5>
          <Col md="6" lg="4"></Col>
          <Col md="6" lg="4">
            <Card body className="text-center">
              <CardTitle tag="h5">Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
              <div>
                <Button color="light-danger">Go somewhere</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </FullLayout>
  );
};

export default Account;
