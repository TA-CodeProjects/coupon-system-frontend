import { UserModel } from "../Models/UserModel";


export class AuthAppState {
    public user: UserModel = new UserModel;
    public constructor(){
        try{
            const storedUser = JSON.parse(localStorage.getItem("user") || '');
            if(storedUser){
                this.user = storedUser;
            }
        }
        catch(error){
            console.log(error);
        }
    }
}

export enum AuthActionType {
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

export function loginAction(user: UserModel): AuthAction {
  return { type: AuthActionType.Login, payload: user };
}

export function logoutAction(): AuthAction {
  return { type: AuthActionType.Logout };
}


export function authReducer(currentState: AuthAppState = new AuthAppState(), action: AuthAction): AuthAppState{
    const newState = {...currentState}
    switch (action.type) {
        case AuthActionType.Login:
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.Logout:
            newState.user = new UserModel();
            localStorage.removeItem("user");
    }
    return newState;
}