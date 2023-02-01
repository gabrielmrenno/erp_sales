import { randomUUID } from "crypto";
import { ICreateUser } from "../dtos/user-dtos";

export class User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
  active: boolean;
  isAdmin: boolean;
  resetPassword: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(props: ICreateUser) {
    this.id = randomUUID();
    this.name = props.name;
    this.username = props.username;
    this.password = props.password || "";
    this.role = props.role;
    this.active = true;
    this.isAdmin = false;
    this.resetPassword = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }
}
