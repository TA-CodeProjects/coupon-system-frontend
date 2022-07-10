import moment from "moment";
import { Card } from "react-bootstrap";
import { CouponsModel } from "../../../Models/Coupons";
import "./CouponItem.css";

interface CouponItemProps{
    coupon: CouponsModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {
    return (
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
            <p>{props.coupon.description}</p>
            <p>{`Price: ${props.coupon.price} Amount: ${props.coupon.amount} `}</p>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{`Expired: ${moment(
            props.coupon.endDate
          ).format("DD/MM/yyyy")} `}</small>
        </Card.Footer>
      </Card>
    );
}

export default CouponItem;
