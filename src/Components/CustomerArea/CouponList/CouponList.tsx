import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CouponsModel } from "../../../Models/Coupons";
import { couponsDownloadedAction } from "../../../Redux/CouponCustomerAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notification";
import { getCoupons } from "../../../WebApi/CouponsCustomerApi";
import CouponTable from "../../CompanyArea/CouponTable/CouponTable";
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
          notify.success("Got coupons list successfully!");
          setCoupons(res.data);
          store.dispatch(couponsDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }, []);
    
    return (
      <div className="CouponList">
        <CouponTable coupons={coupons} />
      </div>
    );
}

export default CouponCustomerList ;
