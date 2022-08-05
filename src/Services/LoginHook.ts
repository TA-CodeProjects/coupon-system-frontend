import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../Redux/store";
import notify, { ErrMsg } from "./Notification";

export function useToken(): any {
    const navigate = useNavigate();

     useEffect(() => {
       if (!store.getState().authState.user.jwt_token) {
         notify.error(ErrMsg.PLS_LOGIN);
         navigate("/login");
       }
     }, []);  
}