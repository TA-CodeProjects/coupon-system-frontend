import { CompanyModel } from "../../../Models/Company";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./CompanyItem.css";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteCompany from "../DeleteCompany/DeleteCompany";
import { Link } from "react-router-dom";

interface CompanyItemProps {
    company: CompanyModel;
    setCompanies: React.Dispatch<React.SetStateAction<CompanyModel[]>>;
}

function CompanyItem(props: CompanyItemProps): JSX.Element {
  const [show, SetShow] = useState(false);
  const handleClose = () => SetShow(false);
  const handleShow = () => SetShow(true);

    return (
      <tr>
        <td>{props.company.id}</td>
        <td>{props.company.name}</td>
        <td>{props.company.email}</td>
        <td>{props.company.password}</td>
        <td>
          <Button variant="default">
            <Link to={`/admin/company/edit/${props.company.id}`} className="link-dark">
              <FaEdit size={26} />
            </Link>
          </Button>
        </td>
        <td>
          <Button onClick={handleShow} variant="default">
            <FaTrash size={26} />
          </Button>
          <DeleteCompany
            id={props.company.id}
            show={show}
            handleClose={handleClose}
            setCompanies={props.setCompanies}
          />
        </td>
      </tr>
    );
}

export default CompanyItem;
