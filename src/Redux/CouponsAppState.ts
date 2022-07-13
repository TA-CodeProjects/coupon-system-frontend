import { CouponsModel } from "../Models/Coupons";

export class CouponsAppState {
    public coupons: CouponsModel[] = [];
}

export enum CouponsActionType {
  CouponsDownloaded = "CouponsDownloaded",
}

export interface CouponsAction {
    type: CouponsActionType;
    payload?: any;
}

export function couponsDownloadedAction(coupons: CouponsModel[]): CouponsAction {
  return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

export function couponsReducer(currentState: CouponsAppState = new CouponsAppState(),
    action: CouponsAction): CouponsAppState {
    const newState = { ...currentState };
    switch (action.type) {
      case CouponsActionType.CouponsDownloaded:
        newState.coupons = action.payload;
        break;
    }
       return newState;
    }