import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CouponsModel } from "../../../Models/Coupons";
import { couponsDownloadedAction } from "../../../Redux/CouponCustomerAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { getCoupons } from "../../../WebApi/CouponsCustomerApi";
import CouponTable from "../../CustomerArea/CouponTable/CouponTable";
import "./CouponList.css";

function CouponCustomerList(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
      if (!store.getState().authState.user.jwt_token) {
        notify.error(ErrMsg.PLS_LOGIN);
        navigate("/login");
      }
    }, []);  
    
    const [coupons, setCoupons] = useState<CouponsModel[]>(
      store.getState().couponCustomerReducer.coupons
    );

    useEffect(() => {
      getCoupons()
        .then((res) => {
          notify.success(SccMsg.GOT_COUPONS);
          setCoupons(res.data);
          store.dispatch(couponsDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err);
        });
    }, []);
    
    return (
      <div className="CouponList">
        <CouponTable coupons={coupons} />
      </div>
    );
}

export default CouponCustomerList ;
