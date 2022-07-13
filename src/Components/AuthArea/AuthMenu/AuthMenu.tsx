import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ClientType } from "../../../Models/ClientType";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./AuthMenu.css";


function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>(store.getState().authState.user);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => { 
            setUser(store.getState().authState?.user || new UserModel());
        });

        return unsubscribe;
    },[]);

    return (
      <div className="AuthMenu">
        {user?.jwt_token && user.clientType === "Administrator" ? (
          <Nav>
            <Nav.Link disabled>
              <span className="text-light text-capitalize mx-3">
                Welcome {user?.username.split("@")[0]}
              </span>
            </Nav.Link>
            <Nav.Link>
              <CustomLink to="/admin/panel">Admin Panel</CustomLink>
            </Nav.Link>
            <Nav.Link>
              <CustomLink to="/logout">Logout</CustomLink>
            </Nav.Link>
          </Nav>
        ) : user?.jwt_token && user.clientType === "Company" ? (
          <Nav>
            <Nav.Link disabled>
              <span className="text-light text-capitalize">
                Welcome {user?.username.split("@")[0]}
              </span>
            </Nav.Link>
            <Nav.Link>
              <CustomLink to="/company">Company Panel</CustomLink>
            </Nav.Link>
            <Nav.Link>
              <CustomLink to="/logout">Logout</CustomLink>
            </Nav.Link>
          </Nav>
        ) : user?.jwt_token && user.clientType === "Customer" ? (
          <Nav>
            <Nav.Link disabled>
              <span className="text-light text-capitalize mx-3">
                Welcome {user?.username.split("@")[0]}
              </span>
            </Nav.Link>
            <Nav.Link>
              <CustomLink to="/customer">Customer Panel</CustomLink>
            </Nav.Link>
            <Nav.Link>
              <CustomLink to="/logout">Logout</CustomLink>
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link disabled>
              <span className="text-light mx-3">Hello guest</span>
            </Nav.Link>
            <Nav.Link>
              <CustomLink to="/Login">Login</CustomLink>
            </Nav.Link>
          </Nav>
        )}
      </div>
    );
}

export default AuthMenu;
