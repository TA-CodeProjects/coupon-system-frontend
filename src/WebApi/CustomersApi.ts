import { CustomerModel } from "../Models/Customer";
import globals from "../Services/globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getCustomers() {
  return await tokenAxios.get<CustomerModel[]>(globals.urls.customers);
};

export async function getCustomer(id: number) {
  return await tokenAxios.get<CustomerModel>(globals.urls.customers + id);
};

export async function countCustomers() {
  return await tokenAxios.get<CustomerModel>(globals.urls.customers + "count");
};

export async function addCustomer(customer: CustomerModel) {
  return await tokenAxios.post<CustomerModel>(
    globals.urls.customers + customer
  );
};

export async function deleteCustomer(id: number) {
  return await tokenAxios.delete<any>(globals.urls.customers + id);
};

export async function updateCustomer(id: number, customer: CustomerModel) {
  return await tokenAxios.put<CustomerModel>(
    globals.urls.customers + id,
    customer
  );
};