import axios from "axios";
import { CouponsModel } from "../Models/Coupons";
import globals from "../Services/globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getCoupons() {
    return await axios.get<CouponsModel[]>(globals.urls.coupons);
}