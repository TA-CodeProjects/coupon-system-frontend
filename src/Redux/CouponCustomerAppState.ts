import { CouponsModel } from "../Models/Coupons";

export class CouponsCustomerAppState {
    public coupons: CouponsModel[] = [];
}


export enum CouponsCustomerActionType {
  CouponsDownloaded = "CouponsDownloaded",
  CouponPurchase = "CouponPurchase",
  CouponsClear = "CouponsClear",
}

export interface CouponsCustomerAction {
  type: CouponsCustomerActionType;
  payload?: any;
}

export function couponsDownloadedAction(coupons: CouponsModel[]): CouponsCustomerAction {
    return { type: CouponsCustomerActionType.CouponsDownloaded, payload: coupons };
}

export function couponPurchaseAction(coupon: CouponsModel): CouponsCustomerAction {
  return { type: CouponsCustomerActionType.CouponPurchase, payload: coupon };
}


export function couponsClearAction(): CouponsCustomerAction {
  return { type: CouponsCustomerActionType.CouponsClear, payload: {} };
}

export function couponsCustomerReducer(currentState: CouponsCustomerAppState = new CouponsCustomerAppState(), action: CouponsCustomerAction): CouponsCustomerAppState {
    const newState = { ...currentState}
    switch (action.type) {
      case CouponsCustomerActionType.CouponsDownloaded:
        newState.coupons = action.payload;
        break;
      case CouponsCustomerActionType.CouponPurchase:
        newState.coupons.push(action.payload);
        break;
      case CouponsCustomerActionType.CouponsClear:
        newState.coupons = [];
        break;
    }
    return newState;
}




