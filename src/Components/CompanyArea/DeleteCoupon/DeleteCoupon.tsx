import { Button, Modal } from "react-bootstrap";
import { CouponsModel } from "../../../Models/Coupons";
import { couponDeletedAction } from "../../../Redux/CouponCompanyAppState";
import store from "../../../Redux/store";
import notify, { SccMsg } from "../../../Services/Notification";
import { deleteCoupon } from "../../../WebApi/CouponsCompanyApi";
import "./DeleteCoupon.css";

interface DeleteCouponProps {
  id?: number;
  show: boolean;
  handleClose: any;
  setCouponsCompany: React.Dispatch<React.SetStateAction<CouponsModel[]>>;
}

function DeleteCoupon(props: DeleteCouponProps): JSX.Element {

    const yes = () => {
      deleteCoupon(props.id || 0)
        .then((any) => {
          notify.success(SccMsg.DELETED_COUPON);
          store.dispatch(couponDeletedAction(props.id || 0));
          props.handleClose();
         
        })
        .catch((err) => {
          notify.error(err);
        });
        return store.subscribe(() => {
          props.setCouponsCompany(
            store.getState().couponsCompanyReducer.couponsCompany
          );
        });
    };

    const no = () => {
      props.handleClose();
    };
    return (
      <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header>
            <Modal.Title>Delete Coupon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete coupon #{props.id}?
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

export default DeleteCoupon;
