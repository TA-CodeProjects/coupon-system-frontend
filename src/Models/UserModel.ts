export class UserModel {
  public jwt_token: string;
  public username: string;
  public clientType: string;

  public constructor(jwt_token?: string, username?: string, clientType?: string) {
    this.jwt_token = jwt_token || "";
    this.username = username || "";
    this.clientType = clientType || "";
  }
}