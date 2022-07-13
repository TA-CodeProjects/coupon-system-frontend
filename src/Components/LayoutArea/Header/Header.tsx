import { Container, Nav, Navbar } from "react-bootstrap";
import src from "../../../Assets/Images/shopping_cart.png"
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./Header.css";

function Header(): JSX.Element {
    return (
      <div className="Header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <div className="d-flex align-items-center">
                <img src={src} alt="logo" width="60" className="align-top" />{" "}
                <h2 className="d-inline orange">Tikva Market Coupons</h2>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav.Link>
                <CustomLink to="home">Home</CustomLink>
              </Nav.Link>
              {/* <Nav className="me-auto"></Nav> */}
              <AuthMenu />
              {/* <Nav>
                <Nav.Link>
                  <CustomLink to="home">Home</CustomLink>
                </Nav.Link>
                <Nav.Link>
                  <CustomLink to="/admin/panel">Admin</CustomLink>{" "}
                </Nav.Link>
                <Nav.Link>
                  <CustomLink to="/company">Company</CustomLink>{" "}
                </Nav.Link>
                <Nav.Link>
                  <CustomLink to="/customer">Customer</CustomLink>{" "}
                </Nav.Link>
              </Nav> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default Header;
