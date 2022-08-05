import { useEffect, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import { CouponsModel } from "../../../Models/Coupons";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/store";
import notify, { SccMsg } from "../../../Services/Notification";
import { getCoupons } from "../../../WebApi/CouponsApi";
import CouponItem from "../CouponItem/CouponItem";
import CouponTable from "../CouponTable/CouponTable";
import "./CouponsList.css";

function CouponsList(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponsModel[]>(
      store.getState().couponsReducer.coupons
    );

    useEffect(() => {
      // if (coupons?.length === 0) {
         getCoupons()
           .then((res) => {
             notify.success(SccMsg.GOT_COUPONS);
             setCoupons(res.data);
             store.dispatch(couponsDownloadedAction(res.data));
           })
           .catch((err) => {
             notify.error(err.message);
           });
      // }
       
    }, []);
    

    return (
      <div className="CouponsList">
        <Container>
          <h2 className="text-center">Coupons List</h2>
          <CouponTable coupons={coupons} />
        </Container>
      </div>
    );
}

export default CouponsList;
