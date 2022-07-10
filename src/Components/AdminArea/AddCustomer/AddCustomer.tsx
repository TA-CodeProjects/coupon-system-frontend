import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomerPayloadModel } from "../../../Models/Customer";
import { customerAddedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/store";
import globals from "../../../Services/globals";
import notify, { ErrMsg } from "../../../Services/Notification";
import { addCustomer } from "../../../WebApi/CustomersApi";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {
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
  } = useForm<CustomerPayloadModel>({ mode: "all" });

  const yalla = async (customer: CustomerPayloadModel) => {
    console.log(customer);
    console.log(JSON.stringify(customer));

    await addCustomer(customer)
      .then((res) => {
        notify.success("New Customer Created");
        store.dispatch(customerAddedAction(res.data));
        navigate("/admin/customer");
      })
      .catch((err) => {
        notify.error(err.message);
      });
  };

  return (
    <div className="AddCustomer">
      <h2 className="text-center">Add Customer</h2>
      <Form onSubmit={handleSubmit(yalla)}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            {...register("firstName")}
            type="text"
            placeholder="Enter First Name"
          />
          <span>{errors.firstName?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            {...register("lastName")}
            type="text"
            placeholder="Enter Last Name"
          />
          <span>{errors.lastName?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter Email"
          />
          <span>{errors.email?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="text"
            placeholder="Enter Password"
          />
          <span>{errors.password?.message}</span>
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

export default AddCustomer;