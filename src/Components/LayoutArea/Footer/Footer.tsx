import { Container, Nav, Navbar } from "react-bootstrap";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
      <div className="Footer fixed-bottom bg-dark">
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link>
              <CustomLink to="about">About</CustomLink>{" "}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <CustomLink to="credits">Credits</CustomLink>{" "}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <p className="text-light text-center py-10">
          All rights reserved to Tikva market coupons &copy;
        </p>
      </div>
    );
}

export default Footer;
