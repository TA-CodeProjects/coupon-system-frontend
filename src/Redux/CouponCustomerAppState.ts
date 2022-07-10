import { CouponsModel } from "../Models/Coupons";

export class CouponsAppState {
    public coupons: CouponsModel[] = [];
}


export enum CouponsActionType {
  CouponsDownloaded = "CouponsDownloaded",
  CouponPurchase = "CouponPurchase",
  CouponsClear = "CouponsClear",
}

export interface CouponAction {
    type: CouponsActionType;
    payload?: any;
}

export function couponsDownloadedAction(coupons: CouponsModel[]): CouponAction {
    return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

export function couponPurchaseAction(coupon: CouponsModel): CouponAction {
  return { type: CouponsActionType.CouponPurchase, payload: coupon };
}


export function couponsClearAction(): CouponAction{
    return { type: CouponsActionType.CouponsClear, payload: {}};
}

export function couponsCustomerReducer(currentState: CouponsAppState = new CouponsAppState(), action: CouponAction): CouponsAppState {
    const newState = { ...currentState}
    switch (action.type) {
      case CouponsActionType.CouponsDownloaded:
        newState.coupons = action.payload;
        break;
      case CouponsActionType.CouponPurchase:
        newState.coupons.push(action.payload);
        break;
      case CouponsActionType.CouponsClear:
            newState.coupons = [];
            break;
    }
    return newState;
}




