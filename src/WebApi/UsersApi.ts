import axios from "axios";
import { CredentialsModel } from "../Models/CredentialsModel";
import { UserModel } from "../Models/UserModel";
import globals from "../Services/globals";


export async function login(credentials: CredentialsModel){
    return await axios.post<UserModel>(globals.urls.users + 'login', credentials)
}