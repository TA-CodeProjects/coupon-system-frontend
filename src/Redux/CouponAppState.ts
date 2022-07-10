import { CouponsModel } from "../Models/Coupons";

export class CouponsAppState {
    public coupons: CouponsModel[] = [];
}


export enum CouponsActionType {
  CouponsDownloaded = "CouponsDownloaded",
  CouponAdded = "CouponAdded",
  CouponUpdated = "CouponUpdated",
  CouponDeleted = "CouponDeleted",
  CouponsClear = "CouponsClear",
}

export interface CouponAction {
    type: CouponsActionType;
    payload?: any;
}

export function couponsDownloadedAction(coupons: CouponsModel[]): CouponAction {
    return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}


export function couponAddedAction(coupon: CouponsModel): CouponAction {
    return { type: CouponsActionType.CouponAdded, payload: coupon };
}

export function couponUpdatedAction(coupon: CouponsModel): CouponAction {
    return { type: CouponsActionType.CouponUpdated, payload: coupon };
}

export function couponDeletedAction(id: number): CouponAction {
    return { type: CouponsActionType.CouponDeleted, payload: id };
}

export function couponsClearAction(): CouponAction{
    return { type: CouponsActionType.CouponsClear, payload: {}};
}

export function couponsReducer(currentState: CouponsAppState = new CouponsAppState(), action: CouponAction): CouponsAppState {
    const newState = { ...currentState}
    switch (action.type) {
      case CouponsActionType.CouponsDownloaded:
        newState.coupons = action.payload;
        break;
      case CouponsActionType.CouponAdded:
        newState.coupons.push(action.payload);
        break;
      case CouponsActionType.CouponUpdated:
        const idx = newState.coupons.findIndex(coupon => coupon.id === action.payload.id);
        newState.coupons[idx] = action.payload;
        break;
      case CouponsActionType.CouponDeleted:
            newState.coupons = newState.coupons.filter(coupon => coupon.id !== action.payload)
            break;
      case CouponsActionType.CouponsClear:
            newState.coupons = [];
            break;
    }
    return newState;
}




