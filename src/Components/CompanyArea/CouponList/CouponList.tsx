import { useEffect, useState } from "react";
import { CouponsModel } from "../../../Models/Coupons";
import store from "../../../Redux/store";
import axios from "axios";
import "./CouponList.css";
import globals from "../../../Services/globals";
import notify, { ErrMsg } from "../../../Services/Notification";
import { couponsDownloadedAction } from "../../../Redux/CouponCompanyAppState";
import { Button, ButtonGroup, Dropdown, DropdownButton, Table } from "react-bootstrap";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import CouponItem from "../CouponItem/CouponItem";
import { getCoupons } from "../../../WebApi/CouponsCompanyApi";
import CouponTable from "../CouponTable/CouponTable";
import { Link, useNavigate } from "react-router-dom";

function CouponList(): JSX.Element {
      const navigate = useNavigate();

      useEffect(() => {
        if (!store.getState().authState.user.jwt_token) {
          notify.error(ErrMsg.PLS_LOGIN);
          navigate("/login");
        }
      }, []);  

     const [coupons, setCoupons] = useState<CouponsModel[]>(
      store.getState().couponsCompanyReducer.coupons
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
      <div className="CouponList text-center">
        <h2 className="my-4">Coupons List</h2>
        <Link to="/company/add">
          <Button variant="success">Add Coupon</Button>
        </Link>

        <CouponTable coupons={coupons} />
      </div>
    );
}

export default CouponList;
