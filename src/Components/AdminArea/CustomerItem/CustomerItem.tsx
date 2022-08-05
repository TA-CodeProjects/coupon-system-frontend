import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import DeleteCustomer from "../DeleteCustomer/DeleteCustomer";
import "./CustomerItem.css";

interface CustomerItemProps {
  customer: CustomerModel;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerModel[]>>;
}

function CustomerItem(props: CustomerItemProps): JSX.Element {
  const [show, SetShow] = useState(false);
  const handleClose = () => SetShow(false);
  const handleShow = () => SetShow(true);

  return (
    <tr>
      <td>{props.customer.id}</td>
      <td>{props.customer.firstName}</td>
      <td>{props.customer.lastName}</td>
      <td>{props.customer.email}</td>
      <td>{props.customer.password}</td>
      <td>
        <Button variant="default">
          <Link
            to={`/admin/customer/edit/${props.customer.id}`}
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
        <DeleteCustomer
          id={props.customer.id}
          show={show}
          handleClose={handleClose}
          setCustomers={props.setCustomers}
        />
      </td>
    </tr>
  );
}

export default CustomerItem;
