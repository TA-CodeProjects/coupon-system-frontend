import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { companyDeletedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/store";
import globals from "../../../Services/globals";
import notify from "../../../Services/Notification";
import { deleteCompany } from "../../../WebApi/CompaniesApi";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || "");

    const yes = () => {
      deleteCompany(id)
        .then(any => {
          notify.success("Company deleted successfully");
          store.dispatch(companyDeletedAction(id));
          navigate('/admin/company');
        })
        .catch((err) => {notify.error(err.message)});
    };

    const no = () => {
      navigate('/admin/company');
    }
    return (
      <div className="DeleteCompany">
        <h2>Delete Company</h2>
        <h3>Are you sure you want to delete company #{id}?</h3>
        <div>
          <Button variant="danger" onClick={yes}>
            Yes
          </Button>
          <Button variant="default" onClick={no}>
            No
          </Button>
        </div>
      </div>
    );
}

export default DeleteCompany;
