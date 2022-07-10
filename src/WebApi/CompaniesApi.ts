import { CompanyModel } from "../Models/Company";
import globals from "../Services/globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getCompanies() {
    return await tokenAxios.get<CompanyModel[]>(globals.urls.companies);
};

export async function getCompany(id: number){
    return await tokenAxios.get<CompanyModel>(globals.urls.companies + id);
};

export async function countCompanies(){
    return await tokenAxios.get<CompanyModel>(globals.urls.companies + "count");
};

export async function addCompany(company: CompanyModel) {
    return await tokenAxios.post<CompanyModel>(globals.urls.companies, company);
};

export async function deleteCompany(id: number) {
    return await tokenAxios.delete<any>(globals.urls.companies + id);
};

export async function updateCompany(id: number, company: CompanyModel) {
  return await tokenAxios.put<CompanyModel>(
    globals.urls.companies + id,
    company
  );
};