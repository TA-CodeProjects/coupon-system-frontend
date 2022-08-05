import { CouponsModel } from "../Models/Coupons";

export class CouponsCompanyAppState {
    public couponsCompany: CouponsModel[] = [];
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

export function couponsDownloadedAction(
  couponsCompany: CouponsModel[]
): CouponsCompanyAction {
  return {
    type: CouponsCompanyActionType.CouponsDownloaded,
    payload: couponsCompany,
  };
}


export function couponAddedAction(couponsCompany: CouponsModel): CouponsCompanyAction {
  return {
    type: CouponsCompanyActionType.CouponAdded,
    payload: couponsCompany,
  };
}

export function couponUpdatedAction(
  couponsCompany: CouponsModel
): CouponsCompanyAction {
  return {
    type: CouponsCompanyActionType.CouponUpdated,
    payload: couponsCompany,
  };
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
      newState.couponsCompany = action.payload;
      break;
    case CouponsCompanyActionType.CouponAdded:
      newState.couponsCompany.push(action.payload);
      break;
    case CouponsCompanyActionType.CouponUpdated:
      const idx = newState.couponsCompany.findIndex(
        (coupon) => coupon.id === action.payload.id
      );
      newState.couponsCompany[idx] = action.payload;
      break;
    case CouponsCompanyActionType.CouponDeleted:
      newState.couponsCompany = newState.couponsCompany.filter(
        (coupon) => coupon.id !== action.payload
      );
      break;
    case CouponsCompanyActionType.CouponsClear:
      newState.couponsCompany = [];
      break;
  }
  return newState;
}




