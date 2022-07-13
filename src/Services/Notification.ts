import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export enum SccMsg {
  ADDED_COMPANY = "Added company successfully",
  UPDATED_COMPANY = "Updated company successfully",
  DELETED_COMPANY = "Deleted company successfully",
  GOT_COMPANY = "Got companies successfully",
  ADDED_CUSTOMER = "Added customer successfully",
  UPDATED_CUSTOMER = "Updated customer successfully",
  DELETED_CUSTOMER = "Deleted customer successfully",
  GOT_CUSTOMERS = "Got customers successfully",
  ADDED_COUPON = "Added coupon successfully",
  UPDATED_COUPON = "Updated coupon successfully",
  DELETED_COUPON = "Deleted coupon successfully",
  GOT_COUPONS = "Got coupons successfully",
  LOGOUT_SUCCESS = "logout successfully",
  LOGIN_SUCCESS = "login successfully",
}

export enum ErrMsg {
  PLS_LOGIN = "please login",
}

class Notify {
  private notification = new Notyf({
    duration: 6000,
    position: { x: "left", y: "top" },
  });

  public success(message: string) {
    this.notification.success(message);
  }

  public error(err: any) {
    const msg = this.extractMsg(err);
    this.notification.error(msg);
  }

  private extractMsg(err: any): string {

    if (typeof err === "string") {
        return err;
    }

    if(typeof err?.response?.data?.description === 'string'){
        return err?.response?.data?.description;
    }

    if (typeof err?.response?.data === 'string'){
        return err?.response?.data;
    }

    if (Array.isArray(err?.response?.data)) {
        return err?.response?.data[0];
    }

    if (typeof err?.message === 'string') {
        return err.message;
    }

    return "An error occurred, please try again.";

        
    }
  }


const notify = new Notify();
export default notify;