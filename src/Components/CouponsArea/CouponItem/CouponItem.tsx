import moment from "moment";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CouponsModel } from "../../../Models/Coupons";
import "./CouponItem.css";

interface CouponItemProps{
    coupon: CouponsModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {
    return (
      <Col className="d-flex">
        <Card className="shadow mb-5">
          <Card.Img
            variant="top"
            src={require(`../../../Assets/Images/${props.coupon.image}`)}
            alt={props.coupon.image}
          />
          <Card.Header className="text-center orange fw-bold bg-dark">
            {props.coupon.title}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <p className="orange fw-bold">{props.coupon.description}</p>
              <p>
                only coupons{" "}
                <span className="text-success fw-bold">
                  {props.coupon.amount}
                </span>{" "}
                left
              </p>
            </Card.Text>

            <small className="text-muted">{`Expired: ${moment(
              props.coupon.endDate
            ).format("DD/MM/yyyy")} `}</small>
          </Card.Body>
          <Card.Footer>
            <Link to={`/customer/purchaseCoupon/${props.coupon.id}`}>
              <Button variant="success">
                Purchase coupon ₪ {props.coupon.price}
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    );
}

export default CouponItem;
