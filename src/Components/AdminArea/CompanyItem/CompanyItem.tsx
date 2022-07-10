import { CompanyModel } from "../../../Models/Company";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./CompanyItem.css";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";

interface CompanyItemProps {
    company: CompanyModel;
}

function CompanyItem(props: CompanyItemProps): JSX.Element {
    return (
      <tr>
        <td>{props.company.id}</td>
        <td>{props.company.name}</td>
        <td>{props.company.email}</td>
        <td>{props.company.password}</td>
        <td>
          <CustomLink to={`/admin/company/edit/${props.company.id}`}>
            <FaEdit size={32} />
          </CustomLink>
        </td>
        <td>
          <CustomLink to={`/admin/company/delete/${props.company.id}`}>
            <FaTrash size={32} />
          </CustomLink>
        </td>
      </tr>
    );
}

export default CompanyItem;
