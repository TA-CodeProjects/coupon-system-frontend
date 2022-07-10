import axios from "axios";
import store from "../Redux/store";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(request => {
    request.headers = {
        "Authorization": `Bearer ${store.getState().authState.user.jwt_token}`
    };

    return request;
});

export default tokenAxios;