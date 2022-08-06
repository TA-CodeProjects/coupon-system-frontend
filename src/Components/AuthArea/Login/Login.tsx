import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { loginAction } from "../../../Redux/AuthAppState";
import store from "../../../Redux/store";
import notify, { SccMsg } from "../../../Services/Notification";
import { login } from "../../../WebApi/UsersApi";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.css";
import { ClientType } from "../../../Models/ClientType";

function Login(): JSX.Element {
    const navigate = useNavigate();

    // const schema = yup.object().shape({
    //   clientType: yup.string().required("Client Type is required"),
    //   email: yup.string().email("Email is required"),
    //   password: yup.string().min(4).max(15).required("Password is required"),
    // });

    const navigation = (clientType: ClientType) => {
      switch (clientType) {
        case ClientType.Admin:
          navigate("/admin/panel");
          break;
        case ClientType.Company:
          navigate("/company");
          break;
        case ClientType.Customer:
          navigate("/customer");
          break;
      }
    };


    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid },
    } = useForm<CredentialsModel>({
      mode: "all",
      // resolver: yupResolver(schema),
    });

    const onSubmit = async (credentials: CredentialsModel) => {

        await login(credentials)
            .then(res => {
                notify.success(SccMsg.LOGIN_SUCCESS);
                store.dispatch(loginAction(res.data));
                navigation(credentials.clientType);
            })
            .catch (err => {
                notify.error(err);
                console.log(err.message);
            });
    }

    return (
      <div className="Login text-center">
        <h2>Login</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formClientType">
            <Form.Label>Client Type</Form.Label>
            <Form.Control {...register("clientType")} as="select">
              <option value="Administrator">Administrator</option>
              <option value="Company">Company</option>
              <option value="Customer">Customer</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("email")}
              type="text"
              placeholder="Enter Email"
            />
            <span className="text-danger">{errors.email?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register("password")}
              type="text"
              placeholder="Enter Password"
            />
            <span className="text-danger">{errors.password?.message}</span>
          </Form.Group>
          <Form.Group>
            <Button
              disabled={!isValid || !isDirty}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
}

export default Login;
