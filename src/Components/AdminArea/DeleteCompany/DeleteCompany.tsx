import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CompanyModel } from "../../../Models/Company";
import { companyDeletedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/store";
import notify, { SccMsg } from "../../../Services/Notification";
import { deleteCompany } from "../../../WebApi/CompaniesApi";
import "./DeleteCompany.css";

interface DeleteCompanyProps {
  id?: number;
  show: boolean;
  handleClose: any;
  setCompanies: React.Dispatch<React.SetStateAction<CompanyModel[]>>;
}

function DeleteCompany(props: DeleteCompanyProps): JSX.Element {

    const yes = () => {
      deleteCompany(props.id || 0)
        .then(any => {
          notify.success(SccMsg.DELETED_COMPANY);
          store.dispatch(companyDeletedAction(props.id || 0));
          props.handleClose();
        })
        .catch((err) => {notify.error(err)});
        return store.subscribe(() => {
          props.setCompanies(store.getState().companyReducer.companies);
        });
    };

    const no = () => {
      props.handleClose();
    }
    return (
      <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header>
            <Modal.Title>Delete Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete company #{props.id}?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={yes} variant="danger" className="mx-2">
              Yes
            </Button>
            <Button onClick={no} variant="secondary">
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteCompany;
