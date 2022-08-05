import { appendErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddCompany.css";
import { CompanyPayloadModel } from "../../../Models/Company";
import notify, { SccMsg } from "../../../Services/Notification";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import { companyAddedAction } from "../../../Redux/CompanyAppState";
import { addCompany } from "../../../WebApi/CompaniesApi";


function AddCompany(): JSX.Element {

    const navigate = useNavigate();
    
    const schema = yup.object().shape({
      name: yup.string().required("name is required"),
      email: yup.string().email("Email is required"),
      password: yup.string().min(4).max(15).required("Password is required"),
    });

    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid },
    } = useForm<CompanyPayloadModel>({
      mode: "all",
      resolver: yupResolver(schema),
    });

    const yalla = async (company: CompanyPayloadModel) => {
      console.log(company);
      console.log(JSON.stringify(company));

      addCompany(company)
          .then((res) => {
            notify.success(SccMsg.ADDED_COMPANY);
            store.dispatch(companyAddedAction(res.data));
            navigate("/admin/company");
          })
          .catch((err) => {
            notify.error(err);
          });
    };

  return (
    <div className="AddCompany">
      <h2 className="text-center">Add Company</h2>
      <Form onSubmit={handleSubmit(yalla)}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("name")}
            type="text"
            placeholder="Enter Name"
          />
          <span className="text-danger">{errors.name?.message}</span>
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

export default AddCompany;
