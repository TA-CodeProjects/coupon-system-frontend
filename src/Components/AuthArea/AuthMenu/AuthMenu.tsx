import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
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
        {user?.jwt_token ? (
          <>
            <span className="text-light text-capitalize mx-3">
              Welcome {user?.username.split("@")[0]}
            </span>
            &nbsp;
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <span className="text-light mx-3">Hello guest</span>
            &nbsp;
            <Link to="/Login">Login</Link>
          </>
        )}
      </div>
    );
}

export default AuthMenu;
