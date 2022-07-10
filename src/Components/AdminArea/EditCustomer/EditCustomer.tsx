import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer";
import { customerUpdatedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notification";
import { updateCustomer } from "../../../WebApi/CustomersApi";
import "./EditCustomer.css";

function EditCustomer(): JSX.Element {
  const navigate = useNavigate();


  const params = useParams();
  const id = +(params.id || "");

  const [customer, setCustomer] = useState<CustomerModel>(
    store
      .getState()
      .customerReducer.customers.filter((customer) => customer.id === id)[0]
  );

  // const schema = yup.object().shape({
  //   name: yup.string().required("name is required"),
  //   email: yup.string().required("email is required"),
  //   password: yup.string().required("password is required"),
  // });

  let defaultValuesObj = { ...customer };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all" });

  const { dirtyFields } = useFormState({ control });

  const yalla = async (customer: CustomerModel) => {
    console.log(customer);
    console.log(JSON.stringify(useFormState));

    await updateCustomer(id, customer)
      .then((res) => {
        notify.success("Customer Update");
        store.dispatch(customerUpdatedAction(res.data));
        navigate("/admin/customer");
      })
      .catch((err) => {
        notify.error(err.message);
      });
  };

  return (
    <div className="EditCustomer">
      <h2 className="text-center">Update Customer</h2>
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
          <Button disabled={!isDirty} variant="primary" type="submit">
            Update
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}


export default EditCustomer;
