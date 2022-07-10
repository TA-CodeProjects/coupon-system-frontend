import { Button } from "react-bootstrap";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./AdminPanel.css";

function AdminPanel(): JSX.Element {
    return (
      <div className="AdminPanel text-center">
        <h1 className=" my-5">Welcome Admin</h1>
        <div className="d-grid gap-2">
          <p className="text-muted my-2">Please choose where you want to go:</p>
          <div className="my-4 ">
            <CustomLink to="/admin/company">
              <Button variant="primary" size="lg">
                Company List
              </Button>
            </CustomLink>{" "}
          </div>
          <div>
            <CustomLink to="/admin/customer">
              <Button variant="secondary" size="lg">
                Customer List
              </Button>
            </CustomLink>{" "}
          </div>
        </div>
      </div>
    );
}

export default AdminPanel;
