import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import AdminPanel from "../../AdminArea/AdminPanel/AdminPanel";
import CompanyList from "../../AdminArea/CompanyList/CompanyList";
import CustomerList from "../../AdminArea/CustomerList/CustomerList";
import DeleteCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../AdminArea/DeleteCustomer/DeleteCustomer";
import EditCompany from "../../AdminArea/EditCompany/EditCompany";
import EditCustomer from "../../AdminArea/EditCustomer/EditCustomer";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import CouponList from "../../CompanyArea/CouponList/CouponList";
import CouponCustomerList from "../../CustomerArea/CouponList/CouponList";
import DeleteCoupon from "../../CompanyArea/DeleteCoupon/DeleteCoupon";
import EditCoupon from "../../CompanyArea/EditCoupon/EditCoupon";
import About from "../../PagesArea/About/About";
import Credits from "../../PagesArea/Credits/Credits";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../Page404/Page404";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import PurchaseCoupon from "../../CustomerArea/PurchaseCoupon/PurchaseCoupon";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/admin/company" element={<CompanyList />} />
        <Route path="/admin/company/add" element={<AddCompany />} />
        <Route path="/admin/company/edit/:id" element={<EditCompany />} />
        <Route path="/admin/company/delete/:id" element={<DeleteCompany />} />
        <Route path="/admin/customer" element={<CustomerList />} />
        <Route path="/admin/customer/add" element={<AddCustomer />} />
        <Route path="/admin/customer/edit/:id" element={<EditCustomer />} />
        <Route path="/admin/customer/delete/:id" element={<DeleteCustomer />} />
        <Route path="/company" element={<CouponList />} />
        <Route path="/company/add" element={<AddCoupon />} />
        <Route path="/company/edit/:id" element={<EditCoupon />} />
        <Route path="/company/delete/:id" element={<DeleteCoupon />} />
        <Route path="/customer" element={<CouponCustomerList />} />
        <Route path="/customer/purchaseCoupon/:id" element={<PurchaseCoupon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default Routing;
