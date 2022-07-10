import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { companiesReducer } from "./CompanyAppState";
import { couponsReducer } from "./CouponAppState";
import { couponsCustomerReducer } from "./CouponCustomerAppState";
import { customersReducer } from "./CustomerAppState";


const reducers = combineReducers({
  companyReducer: companiesReducer,
  customerReducer: customersReducer,
  couponsReducer: couponsReducer,
  couponCustomerReducer: couponsCustomerReducer,
  authState: authReducer
});
const store = createStore(reducers);

export default store;