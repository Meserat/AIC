import { Role } from "./role";

export class Users {
  userId:number;
  userFirstName:String;
  userLastName:String;
  userUserName:String;
  userEmail:String;
  userPhoneNumber:String;
  userPassword:String
  userRole:Role;
  status:boolean = true;
}
