import { CouponsModel } from "../Models/Coupons";
import globals from "../Services/globals";
import tokenAxios from "../Services/InterceptorAxios";


export async function getCoupons(){
    return await tokenAxios.get<CouponsModel[]>(globals.urls.company);
};

export async function getCoupon(id: number) {
    return await tokenAxios.get<CouponsModel>(globals.urls.company + id);
};

export async function addCoupon(coupon: CouponsModel) {
    return await tokenAxios.post<CouponsModel>(globals.urls.company, coupon);
};

export async function deleteCoupon(id: number){
    return await tokenAxios.delete<any>(globals.urls.company + id);
};

export async function updateCoupon(id: number, coupon: CouponsModel) {
    return await tokenAxios.put<CouponsModel>(globals.urls.company + id,coupon);
};