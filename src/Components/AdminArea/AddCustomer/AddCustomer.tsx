import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomerPayloadModel } from "../../../Models/Customer";
import { customerAddedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notification";
import { addCustomer } from "../../../WebApi/CustomersApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function AddCustomer(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Email is required"),
    password: yup.string().min(4).max(15).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CustomerPayloadModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const yalla = async (customer: CustomerPayloadModel) => {
    console.log(customer);

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
          <span className="text-danger">{errors.firstName?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            {...register("lastName")}
            type="text"
            placeholder="Enter Last Name"
          />
          <span className="text-danger">{errors.lastName?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Enter Email"
          />
          <span className="text-danger">{errors.email?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="text"
            placeholder="Enter Password"
          />
          <span className="text-danger">{errors.password?.message}</span>
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
