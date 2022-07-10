import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CouponsModel } from "../../../Models/Coupons";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./CouponItem.css";

interface CouponItemProps{
    coupon: CouponsModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {
    return (
      <tr>
        <td>{props.coupon.category}</td>
        <td>{props.coupon.id}</td>
        <td>{props.coupon.title}</td>
        <td>{props.coupon.description}</td>
        <td>{moment(props.coupon.startDate).format("DD/MM/yyyy")}</td>
        <td>{moment(props.coupon.endDate).format("DD/MM/yyyy")}</td>
        <td>{props.coupon.price}</td>
        <td>{props.coupon.amount}</td>
        <td>{props.coupon.image}</td>
        <td>
          <CustomLink to={`/company/edit/${props.coupon.id}`}>
            <FaEdit size={32} />
          </CustomLink>
        </td>
        <td>
          <CustomLink to={`/company/delete/${props.coupon.id}`}>
            <FaTrash size={32} />
          </CustomLink>
        </td>
      </tr>
    );
}

export default CouponItem;
