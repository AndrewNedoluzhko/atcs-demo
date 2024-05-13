import { IBase } from "./base.interface";

export interface IUser  extends IBase{
  email: string;
  password: string | undefined; //undefined
  phoneNumber: string;
  firstname: string;
  lastname: string; 
}

