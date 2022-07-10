import { ClientType } from "./ClientType";

export class CredentialsModel {
  public email: string;
  public password: string;
  public clientType: ClientType;

  public constructor(email: string, password: string, clientType: ClientType) {
    this.email = email || "";
    this.password = password || "";
    this.clientType = clientType;
  }
}