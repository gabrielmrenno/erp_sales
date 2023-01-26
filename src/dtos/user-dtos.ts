export interface ICreateUser {
    name: string;
    username: string;
    password: string;
    role: string;
}

export interface IFindUserByUniqueValues {
    username: string;
    name: string;
}