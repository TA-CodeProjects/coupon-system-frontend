import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/Customer";
import store from "../../../Redux/store";
import axios from "axios";
import "./CustomerList.css";
import globals from "../../../Services/globals";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { customersDownloadedAction } from "../../../Redux/CustomerAppState";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import CustomerItem from "../CustomerItem/CustomerItem";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../../WebApi/CustomersApi";
import { useToken } from "../../../Services/LoginHook";

function CustomerList(): JSX.Element {
  const navigate = useNavigate();
  
  useToken();

  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().customerReducer.customers
  );

  useEffect(() => {
    if (customers.length === 0) {
       getCustomers()
          .then((res) => {
            notify.success(SccMsg.GOT_CUSTOMERS);
            setCustomers(res.data);
            store.dispatch(customersDownloadedAction(res.data));
          })
          .catch((err) => {
            notify.error(err);
          });
        }
  }, []);
    
       

  return (
    <div className="CustomerList">
      <h2 className="text-center">Customers</h2>
      <ButtonGroup>
        <Button variant="secondary">
          <CustomLink to="/admin/panel">Back</CustomLink>{" "}
        </Button>
        <Button variant="primary">
          <CustomLink to="/admin/customer/add">Add Customer</CustomLink>
        </Button>
      </ButtonGroup>

      {customers.length > 0 ? (
        <div className="Table pt-2">
          <Table striped bordered hover>
            <thead>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              {customers.map((c) => (
                <CustomerItem key={c.id} customer={c} setCustomers={setCustomers}/>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <h3 className="text-center mt-4 text-muted"> No customer for you!</h3>
      )}
    </div>
  );
}

export default CustomerList;
