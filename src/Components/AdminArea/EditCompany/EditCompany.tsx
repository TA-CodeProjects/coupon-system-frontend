import { useEffect, useState } from "react";
import { CompanyModel, CompanyPayloadModel } from "../../../Models/Company";
// import * as yup from "yup";
import "./EditCompany.css";
import { useForm, useFormState } from "react-hook-form";
import notify, { ErrMsg } from "../../../Services/Notification";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../Redux/store";
import { companyUpdatedAction } from "../../../Redux/CompanyAppState";
import { updateCompany } from "../../../WebApi/CompaniesApi";

function EditCompany(): JSX.Element {
    const navigate = useNavigate();

    const params = useParams();
    const id = +(params.id || "");

    const [company, setCompany] = useState<CompanyModel>(store.getState().companyReducer.companies.filter(company => company.id === id)[0]);

    // const schema = yup.object().shape({
    //   name: yup.string().required("name is required"),
    //   email: yup.string().required("email is required"),
    //   password: yup.string().required("password is required"),
    // });

    let defaultValuesObj = {...company};

    const {
      register,
      handleSubmit,
      control,
      formState: { errors, isDirty, isValid },
    } = useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all" });

    const {dirtyFields} = useFormState({control});

    const yalla = async (company: CompanyModel) => {
      console.log(company);
      console.log(JSON.stringify(company));

      await updateCompany(id, company)
        .then((res) => {
          notify.success("Company Update");
          store.dispatch(companyUpdatedAction(res.data));
          navigate("/admin/company");
        })
        .catch((err) => {
          notify.error(err.message);
        });
    };

    return (
      <div className="EditCompany">
        <h2 className="text-center">Update Company</h2>
        <Form onSubmit={handleSubmit(yalla)}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...register("name")}
              type="text"
              placeholder="Enter Name"
            />
            <span>{errors.name?.message}</span>
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

export default EditCompany;
