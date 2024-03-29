
import CompanyItem from "../CompanyItem/CompanyItem";
import Table from "react-bootstrap/Table";
import "./CompanyList.css";
import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/Company";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import store from "../../../Redux/store";
import { companiesDownloadedAction } from "../../../Redux/CompanyAppState";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCompanies } from "../../../WebApi/CompaniesApi";
import { useToken } from "../../../Services/LoginHook";

function CompanyList(): JSX.Element {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companyReducer.companies);

    useToken();

    useEffect(() => {
      if (companies.length === 0) {
         getCompanies()
        .then((res) => {
            notify.success(SccMsg.GOT_COMPANIES);
            setCompanies(res.data);
            store.dispatch(companiesDownloadedAction(res.data));
        })
        .catch((err) => {
            notify.error(err.message);
        });
      }
    },[]);
  
       


    return (
      <div className="CompanyList">
        <h2 className="text-center">Companies</h2>
        <ButtonGroup>
          <Button variant="secondary">
            <CustomLink to="/admin/panel">Back</CustomLink>{" "}
          </Button>
          <Button variant="primary">
            <CustomLink to="/admin/company/add">Add Company</CustomLink>
          </Button>
        </ButtonGroup>
        {companies.length > 0 ? (
          <div className="Table pt-2">
            <Table striped bordered hover>
              <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
                <th></th>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <CompanyItem key={c.id} company={c} setCompanies={setCompanies}/>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3 className="text-center mt-4 text-muted">
            {" "}
            No companies for you!
          </h3>
        )}
      </div>
    );
}

export default CompanyList;
