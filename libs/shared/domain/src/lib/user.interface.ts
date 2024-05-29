import { IBase } from "./base.interface";
import { IRole } from "./role.interface";

export interface IUser  extends IBase{
  email: string;
  password: string | undefined; //undefined
  phoneNumber: string;
  firstname: string;
  lastname: string; 

  role?: IRole;
  roleId?: string;
}
export type ICreateUser = Pick<IUser, 'email' | 'password' | 'phoneNumber' | 'firstname' | 'lastname'>;
