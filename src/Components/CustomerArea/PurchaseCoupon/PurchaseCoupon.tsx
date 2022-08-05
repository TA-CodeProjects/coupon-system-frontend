import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CouponsModel } from "../../../Models/Coupons";
import { couponPurchaseAction } from "../../../Redux/CouponCustomerAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notification";
import { purchaseCoupon } from "../../../WebApi/CouponsCustomerApi";
import "./PurchaseCoupon.css";


function PurchaseCoupon(): JSX.Element {
     const navigate = useNavigate();

     useEffect(() => {
       if (!store.getState().authState.user.jwt_token) {
         notify.error(ErrMsg.PLS_LOGIN);
         navigate("/login");
       }
     }, []);  


     const params = useParams();
     const id = +(params.id || "");

     const [coupon, setCoupon] = useState<CouponsModel>(
       store
         .getState()
         .couponsReducer.coupons.filter((coupon) => coupon.id === id)[0]
     );
     
      const yes = () => {
      purchaseCoupon(coupon)
        .then((res) => {
            notify.success("Coupon purchased: " + coupon.title);
            store.dispatch(couponPurchaseAction(res.data));
            navigate("/customer");
        })
        .catch((err) => {
            notify.error(err);
        });
    };

        const no = () => {
            navigate("/home");
        };
        
   

    return (
        <div className="PurchaseCoupon text-center">
            <h2>Purchase Coupon</h2>
			<h3>Are you sure you want to purchase coupon: {coupon.title}?</h3>
        <div>
        <Button variant="success" onClick={yes}>
          Yes
        </Button>
        <Button variant="default" onClick={no}>
          No
        </Button>
      </div>
  </div>
    );
}

export default PurchaseCoupon;
