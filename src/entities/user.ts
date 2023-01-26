import { randomUUID } from "crypto";
import { ICreateUser } from "../dtos/user-dtos";

export class User {
    id: string;
    name: string;
    username: string;
    password: string;
    role: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: ICreateUser) {
        this.id = randomUUID();
        this.name = props.name;
        this.username = props.username;
        this.password = props.password;
        this.role = props.role;
        this.isAdmin = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}