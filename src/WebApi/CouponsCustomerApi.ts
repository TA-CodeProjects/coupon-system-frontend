import { CouponsModel } from "../Models/Coupons";
import globals from "../Services/globals";
import tokenAxios from "../Services/InterceptorAxios";


export async function getCoupons(){
    return await tokenAxios.get<CouponsModel[]>(globals.urls.customer);
};

export async function getCoupon(id: number) {
    return await tokenAxios.get<CouponsModel>(globals.urls.customer + id);
};

export async function purchaseCoupon(coupon: CouponsModel) {
    return await tokenAxios.post<CouponsModel>(globals.urls.customer, coupon);
};
