import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../Redux/AuthAppState";
import { companiesClearAction } from "../../../Redux/CompanyAppState";
import { customersClearAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/store";
import notify, { SccMsg } from "../../../Services/Notification";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        notify.success(SccMsg.LOGOUT_SUCCESS);
        store.dispatch(logoutAction());
        store.dispatch(companiesClearAction());
        store.dispatch(customersClearAction());
        navigate("/home");
    });
    return (
        <div className="Logout">
			
        </div>
    );
}

export default Logout;
