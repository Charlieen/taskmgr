import { User } from "./user.model";
import { Err } from "./Err.model";

export interface Auth {
  user?:User;
  userId?:string;
  token?:string;
  err?:Err;
}
