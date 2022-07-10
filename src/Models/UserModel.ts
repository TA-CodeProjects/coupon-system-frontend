export class UserModel {
  public jwt_token: string;
  public username: string;

  public constructor(jwt_token?: string, username?: string) {
    this.jwt_token = jwt_token || "";
    this.username = username || "";
  }
}