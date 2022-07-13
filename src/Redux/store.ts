import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { companiesReducer } from "./CompanyAppState";
import { couponsReducer } from "./CouponsAppState";
import { couponsCompanyReducer } from "./CouponCompanyAppState";
import { couponsCustomerReducer } from "./CouponCustomerAppState";
import { customersReducer } from "./CustomerAppState";


const reducers = combineReducers({
  customerReducer: customersReducer,
  companyReducer: companiesReducer,
  couponsReducer: couponsReducer,
  couponsCompanyReducer: couponsCompanyReducer,
  couponCustomerReducer: couponsCustomerReducer,
  authState: authReducer,
});
const store = createStore(reducers);

export default store;