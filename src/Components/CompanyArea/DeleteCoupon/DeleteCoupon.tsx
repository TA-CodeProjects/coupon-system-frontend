import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { couponDeletedAction } from "../../../Redux/CouponAppState";
import store from "../../../Redux/store";
import notify from "../../../Services/Notification";
import { deleteCoupon } from "../../../WebApi/CouponsApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || "");

    const yes = () => {
      deleteCoupon(id)
        .then((any) => {
          notify.success("Coupon deleted successfully");
          store.dispatch(couponDeletedAction(id));
          navigate("/company");
        })
        .catch((err) => {
          notify.error(err.message);
        });
    };

    const no = () => {
      navigate("/company");
    };
    return (
      <div className="DeleteCoupon">
        <h2>Delete Coupon</h2>
        <h3>Are you sure you want to delete coupon #{id}?</h3>
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

export default DeleteCoupon;
