import moment from "moment";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CouponsModel } from "../../../Models/Coupons";
import DeleteCoupon from "../DeleteCoupon/DeleteCoupon";
import "./CouponItem.css";

interface CouponItemProps {
  couponsCompany: CouponsModel;
  setCouponsCompany: React.Dispatch<React.SetStateAction<CouponsModel[]>>;
}

function CouponItem(props: CouponItemProps): JSX.Element {
  const [show, SetShow] = useState(false);
  const handleClose = () => SetShow(false);
  const handleShow = () => SetShow(true);

    return (
      <tr>
        <td>{props.couponsCompany.category}</td>
        <td>{props.couponsCompany.id}</td>
        <td>{props.couponsCompany.title}</td>
        <td>{props.couponsCompany.description}</td>
        <td>{moment(props.couponsCompany.startDate).format("DD/MM/yyyy")}</td>
        <td>{moment(props.couponsCompany.endDate).format("DD/MM/yyyy")}</td>
        <td>{props.couponsCompany.price}</td>
        <td>{props.couponsCompany.amount}</td>
        <td>{props.couponsCompany.image}</td>
        <td>
          <Button variant="default">
            <Link
              to={`/company/edit/${props.couponsCompany.id}`}
              className="link-dark"
            >
              <FaEdit size={26} />
            </Link>
          </Button>
        </td>
        <td>
          <Button onClick={handleShow} variant="default">
            <FaTrash size={26} />
          </Button>
          <DeleteCoupon
            id={props.couponsCompany.id}
            show={show}
            handleClose={handleClose}
            setCouponsCompany={props.setCouponsCompany}
          />
        </td>
      </tr>
    );
}

export default CouponItem;
