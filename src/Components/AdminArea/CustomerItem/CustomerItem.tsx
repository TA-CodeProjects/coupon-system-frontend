import { FaEdit, FaTrash } from "react-icons/fa";
import { CustomerModel } from "../../../Models/Customer";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./CustomerItem.css";

interface CustomerItemProps {
  customer: CustomerModel;
}

function CustomerItem(props: CustomerItemProps): JSX.Element {
    return (
      <tr>
        <td>{props.customer.id}</td>
        <td>{props.customer.firstName}</td>
        <td>{props.customer.lastName}</td>
        <td>{props.customer.email}</td>
        <td>{props.customer.password}</td>
        <td>
          <CustomLink to={`/admin/customer/edit/${props.customer.id}`}>
            <FaEdit size={32} />
          </CustomLink>
        </td>
        <td>
          <CustomLink to={`/admin/customer/delete/${props.customer.id}`}>
            <FaTrash size={32} />
          </CustomLink>
        </td>
      </tr>
    );
}

export default CustomerItem;
