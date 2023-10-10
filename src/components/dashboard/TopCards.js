import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div
            className={`circle-box lg-box d-inline-block ${props.bg}`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <i className={props.icon}></i> */}
            <img src={props.icon} style={{ width: "2rem", height: "2rem" }} />
          </div>
          <div className="ms-3">
            <h6 className="mb-0 font-weight-bold">{props.earning}</h6>
            <small className="text-muted">{props.subtitle}</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
