import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CouponsModel } from "../../../Models/Coupons";
import { couponUpdatedAction } from "../../../Redux/CouponAppState";
import store from "../../../Redux/store";
import notify from "../../../Services/Notification";
import { updateCoupon } from "../../../WebApi/CouponsApi";
import "./EditCoupon.css";

function EditCoupon(): JSX.Element {
     const navigate = useNavigate();

     const params = useParams();
     const id = +(params.id || "");

     const [coupon, setCoupon] = useState<CouponsModel>(
       store
         .getState()
         .couponsReducer.coupons.filter((coupon) => coupon.id === id)[0]
     );

     // const schema = yup.object().shape({
     //   name: yup.string().required("name is required"),
     //   email: yup.string().required("email is required"),
     //   password: yup.string().required("password is required"),
     // });

     let defaultValuesObj = { ...coupon };

     const {
       register,
       handleSubmit,
       control,
       formState: { errors, isDirty, isValid },
     } = useForm<CouponsModel>({
       defaultValues: defaultValuesObj,
       mode: "all",
     });

     const { dirtyFields } = useFormState({ control });

     const yalla = async (coupon: CouponsModel) => {
       console.log(coupon);
       console.log(JSON.stringify(coupon));

       await updateCoupon(id, coupon)
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
              Update
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
}

export default EditCoupon;
