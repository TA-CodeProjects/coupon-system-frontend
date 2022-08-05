import { Button, Modal } from "react-bootstrap";
import { CustomerModel } from "../../../Models/Customer";
import { customerDeletedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { deleteCustomer } from "../../../WebApi/CustomersApi";
import "./DeleteCustomer.css";

interface DeleteCustomerProps {
  id?: number;
  show: boolean;
  handleClose: any;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerModel[]>>;
}

function DeleteCustomer(props: DeleteCustomerProps): JSX.Element {
 
  const yes = () => {
    deleteCustomer(props.id || 0)
      .then((any) => {
        notify.success(SccMsg.DELETED_CUSTOMER);
        store.dispatch(customerDeletedAction(props.id || 0))
        props.handleClose();
      })
      .catch((err) => {
        notify.error(err);
      });
      return store.subscribe(() => {
        props.setCustomers(store.getState().customerReducer.customers);
      });
  };

  const no = () => {
    props.handleClose();
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete customer #{props.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={yes} variant="danger" className="mx-2">
            Yes
          </Button>
          <Button onClick={no} variant="secondary">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default DeleteCustomer;
