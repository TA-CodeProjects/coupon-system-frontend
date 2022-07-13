import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CouponsModel } from "../../../Models/Coupons";
import { couponUpdatedAction } from "../../../Redux/CouponCompanyAppState";
import store from "../../../Redux/store";
import notify from "../../../Services/Notification";
import { updateCoupon } from "../../../WebApi/CouponsCompanyApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./EditCoupon.css";

function EditCoupon(): JSX.Element {
     const navigate = useNavigate();

     const params = useParams();
     const id = +(params.id || "");

     const [coupon, setCoupon] = useState<CouponsModel>(
       store
         .getState()
         .couponsCompanyReducer.coupons.filter((coupon) => coupon.id === id)[0]
     );

    const schema = yup.object().shape({
      category: yup.string().required("Category is required"),
      title: yup.string().required("Title is required"),
      description: yup.string().required("description is required"),
      startDate: yup
        .date()
        .default(new Date())
        .typeError("You must specify task date")
        .required("When is required")
        .nullable()
        .default(() => new Date()),
      endDate: yup
        .date()
        .default(new Date())
        .typeError("You must specify task date")
        .required("When is required")
        .nullable()
        .default(() => new Date()),
      amount: yup.number(),
      price: yup.number(),
      image: yup.string().required("Image is required"),
    });

     let defaultValuesObj = { ...coupon };
     console.log(coupon)

     const {
       register,
       handleSubmit,
       control,
       formState: { errors, isDirty, isValid },
     } = useForm<CouponsModel>({
       defaultValues: defaultValuesObj,
       mode: "all",
       resolver: yupResolver(schema),
     });

     const { dirtyFields } = useFormState({ control });

     const yalla = async (coupon: CouponsModel) => {
       console.log(coupon);
       console.log(JSON.stringify(coupon));

       updateCoupon(id, coupon)
         .then((res) => {
           notify.success("Coupon Update");
           store.dispatch(couponUpdatedAction(res.data));
           navigate("/company");
         })
         .catch((err) => {
           notify.error(err.message);
         });
     };
    return (
      <div className="EditCoupon">
        <h2 className="text-center">Update Coupon</h2>
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
            <span className="text-danger">{errors.title?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register("description")}
              type="text"
              placeholder="Enter Description"
            />
            <span className="text-danger">{errors.description?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              {...register("startDate")}
              type="date"
              placeholder="pick a start date"
            />
            <span className="text-danger">{errors.startDate?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              {...register("endDate")}
              type="date"
              placeholder="pick a end date"
            />
            <span className="text-danger">{errors.endDate?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              {...register("amount")}
              type="number"
              placeholder="Enter Amount"
            />
            <span className="text-danger">{errors.amount?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              {...register("price")}
              type="number"
              placeholder="Enter Price"
            />
            <span className="text-danger">{errors.price?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              {...register("image")}
              type="text"
              placeholder="Enter image filename"
            />
            <span className="text-danger">{errors.image?.message}</span>
          </Form.Group>
          <Form.Group>
            <Button
              disabled={!isValid || !isDirty}
              variant="primary"
              type="submit"
            >
              Update
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
}

export default EditCoupon;
