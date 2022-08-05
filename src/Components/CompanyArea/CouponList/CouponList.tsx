import { useEffect, useState } from "react";
import { CouponsModel } from "../../../Models/Coupons";
import store from "../../../Redux/store";
import "./CouponList.css";
import notify, { SccMsg } from "../../../Services/Notification";
import { couponsDownloadedAction } from "../../../Redux/CouponCompanyAppState";
import { Button, ButtonGroup, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { getCoupons } from "../../../WebApi/CouponsCompanyApi";
import CouponTable from "../CouponTable/CouponTable";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../../Services/LoginHook";

function CouponList(): JSX.Element {

      useToken();

     const [couponsCompany, setCouponsCompany] = useState<CouponsModel[]>([]);
      

     useEffect(() => {
      if (couponsCompany.length === 0) {
         getCoupons()
           .then((res) => {
             notify.success(SccMsg.GOT_COUPONS);
             setCouponsCompany(res.data);
             store.dispatch(couponsDownloadedAction(res.data));
           })
           .catch((err) => {
             notify.error(err);
           });
      }
     }, []);

     

    return (
      <div className="CouponList text-center">
        <h2 className="my-4">Coupons List</h2>
        <Link to="/company/add">
          <Button variant="success">Add Coupon</Button>
        </Link>

        <CouponTable couponsCompany={couponsCompany} setCouponsCompany={setCouponsCompany} />
      </div>
    );
}

export default CouponList;
