import { CouponsModel } from "../Models/Coupons";

export class CouponsCompanyAppState {
    public coupons: CouponsModel[] = [];
}


export enum CouponsCompanyActionType {
  CouponsDownloaded = "CouponsDownloaded",
  CouponAdded = "CouponAdded",
  CouponUpdated = "CouponUpdated",
  CouponDeleted = "CouponDeleted",
  CouponsClear = "CouponsClear"
}

export interface CouponsCompanyAction {
    type: CouponsCompanyActionType;
    payload?: any;
}

export function couponsDownloadedAction(coupons: CouponsModel[]): CouponsCompanyAction {
    return { type: CouponsCompanyActionType.CouponsDownloaded, payload: coupons };
}


export function couponAddedAction(coupon: CouponsModel): CouponsCompanyAction {
  return { type: CouponsCompanyActionType.CouponAdded, payload: coupon };
}

export function couponUpdatedAction(coupon: CouponsModel): CouponsCompanyAction {
  return { type: CouponsCompanyActionType.CouponUpdated, payload: coupon };
}

export function couponDeletedAction(id: number): CouponsCompanyAction {
  return { type: CouponsCompanyActionType.CouponDeleted, payload: id };
}

export function couponsClearAction(): CouponsCompanyAction {
  return { type: CouponsCompanyActionType.CouponsClear, payload: {} };
}

export function couponsCompanyReducer(
  currentState: CouponsCompanyAppState = new CouponsCompanyAppState(),
  action: CouponsCompanyAction
): CouponsCompanyAppState {
  const newState = { ...currentState };
  switch (action.type) {
    case CouponsCompanyActionType.CouponsDownloaded:
      newState.coupons = action.payload;
      break;
    case CouponsCompanyActionType.CouponAdded:
      newState.coupons.push(action.payload);
      break;
    case CouponsCompanyActionType.CouponUpdated:
      const idx = newState.coupons.findIndex(
        (coupon) => coupon.id === action.payload.id
      );
      newState.coupons[idx] = action.payload;
      break;
    case CouponsCompanyActionType.CouponDeleted:
      newState.coupons = newState.coupons.filter(
        (coupon) => coupon.id !== action.payload
      );
      break;
    case CouponsCompanyActionType.CouponsClear:
      newState.coupons = [];
      break;
  }
  return newState;
}




