import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { customerDeletedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notification";
import { deleteCustomer } from "../../../WebApi/CustomersApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const id = +(params.id || "");

  const yes = () => {
    deleteCustomer(id)
      .then((any) => {
        notify.success("Customer deleted successfully");
        store.dispatch(customerDeletedAction(id));
        navigate("/admin/customer");
      })
      .catch((err) => {
        notify.error(err.message);
      });
  };

  const no = () => {
    navigate("/admin/customer");
  };
  return (
    <div className="DeleteCustomer">
      <h2>Delete Customer</h2>
      <h3>Are you sure you want to delete customer #{id}?</h3>
      <div>
        <Button variant="danger" onClick={yes}>
          Yes
        </Button>
        <Button variant="default" onClick={no}>
          No
        </Button>
      </div>
    </div>
  );
}


export default DeleteCustomer;
