import { useNavigate } from "react-router-dom";
import { appendErrors, useForm } from "react-hook-form";
import "./AddCoupon.css";
import { CouponsModel } from "../../../Models/Coupons";
import notify, { ErrMsg } from "../../../Services/Notification";
import store from "../../../Redux/store";
import { Button, Form } from "react-bootstrap";
import { couponAddedAction } from "../../../Redux/CouponCompanyAppState";
import { addCoupon } from "../../../WebApi/CouponsCompanyApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function AddCoupon(): JSX.Element {
     const navigate = useNavigate();
     

     const schema = yup.object().shape({
       category: yup.string().required("Category is required"),
       title: yup.string().required("Title is required"),
       description: yup.string().required("description is required"),
       startDate: yup
         .date()
         .min(new Date(), "past due date? come on!")
         .default(new Date())
         .typeError("You must specify coupon date")
         .required("Start date is required")
         .nullable()
         .default(() => new Date()),
       endDate: yup
         .date()
         .min(yup.ref("startDate"), "end date can't be before start date")
         .default(new Date())
         .typeError("You must specify coupon date")
         .required("End date is required")
         .nullable()
         .default(() => new Date()),
       amount: yup.number(),
       price: yup.number(),
       image: yup.string().required("Image is required"),
     });
     
     const {
       register,
       handleSubmit,
       formState: { errors, isDirty, isValid },
     } = useForm<CouponsModel>({
       mode: "all",
       resolver: yupResolver(schema),
     });

     const yalla = async (coupon: CouponsModel) => {
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
            <Button disabled={!isValid} variant="primary" type="submit">
              Add
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
}

export default AddCoupon;
