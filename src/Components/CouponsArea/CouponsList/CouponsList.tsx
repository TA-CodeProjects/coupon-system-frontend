import axios from "axios";
import { useEffect, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import { CouponsModel } from "../../../Models/Coupons";
import globals from "../../../Services/globals";
import notify from "../../../Services/Notification";
import CouponItem from "../CouponItem/CouponItem";
import "./CouponsList.css";

function CouponsList(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponsModel[]>([]);

    useEffect(() => {
        axios.get<CouponsModel[]>(globals.urls.coupons)
        .then((res) => {
            notify.success("Got Coupons List Successfully!");
            setCoupons(res.data);
        })
        .catch((err) => {
            notify.error(err.message);
        });
    }, []);
    

    return (
      <div className="CouponsList">
        <Container>
          <h2 className="text-center">Coupons List</h2>
          <div className="list">
            <Row xs={1} md={2} lg={4} className="g-4">
              {coupons.length > 0
                ? coupons.map((coupon) => (
                  <Col className="d-flex">
                      <CouponItem key={coupon.id} coupon={coupon} />
                    </Col>
                  ))
                : "No Coupons Available"}
            </Row>
          </div>
        </Container>
      </div>
    );
}

export default CouponsList;
