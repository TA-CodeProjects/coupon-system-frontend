import { useNavigate } from "react-router-dom";
import { appendErrors, useForm } from "react-hook-form";
import "./AddCoupon.css";
import axios from "axios";
import { CouponsPayloadModel } from "../../../Models/Coupons";
import globals from "../../../Services/globals";
import notify, { ErrMsg } from "../../../Services/Notification";
import store from "../../../Redux/store";
import { Button, Form } from "react-bootstrap";
import { couponAddedAction } from "../../../Redux/CouponAppState";
import { addCoupon } from "../../../WebApi/CouponsApi";
import { useEffect } from "react";

function AddCoupon(): JSX.Element {
     const navigate = useNavigate();

     // const schema = yup.object().shape({
     //   name: yup.string().required("name is required"),
     //   email: yup.string().required("email is required"),
     //   password: yup.string().required("password is required"),
     // });

     const {
       register,
       handleSubmit,
       formState: { errors, isDirty, isValid },
     } = useForm<CouponsPayloadModel>({ mode: "all" });

     const yalla = async (coupon: CouponsPayloadModel) => {
       console.log(coupon);
       console.log(JSON.stringify(coupon));

       await addCoupon(coupon)
         .then((res) => {
           notify.success("New Coupon Created");
           store.dispatch(couponAddedAction(res.data));
           navigate("/company");
         })
         .catch((err) => {
           notify.error(err.message);
         });
     };
    return (
      <div className="AddCoupon">
        <h2 className="text-center">Add Coupon</h2>
        <Form onSubmit={handleSubmit(yalla)}>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control {...register("category")} as="select">
              <option value="Food">Food</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              {...register("title")}
              type="text"
              placeholder="Enter Title"
            />
            <span>{errors.title?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register("description")}
              type="text"
              placeholder="Enter Description"
            />
            <span>{errors.description?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              {...register("startDate")}
              type="date"
              placeholder="pick a start date"
            />
            <span>{errors.startDate?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              {...register("endDate")}
              type="date"
              placeholder="pick a end date"
            />
            <span>{errors.endDate?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              {...register("amount")}
              type="number"
              placeholder="Enter Amount"
            />
            <span>{errors.amount?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              {...register("price")}
              type="number"
              placeholder="Enter Price"
            />
            <span>{errors.price?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              {...register("image")}
              type="text"
              placeholder="Enter image filename"
            />
            <span>{errors.image?.message}</span>
          </Form.Group>
          <Form.Group>
            <Button disabled={!isValid} variant="primary" type="submit">
              Add
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
}

export default AddCoupon;
