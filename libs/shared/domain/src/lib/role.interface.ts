import { IBase } from "./base.interface";
import { IUser } from "./user.interface";

export interface IRole extends IBase{
  name:string;
  users: IUser[]
} 