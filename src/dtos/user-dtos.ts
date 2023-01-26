export interface ICreateUser {
    name: string;
    username: string;
    role: string;
    password?: string;
}

export interface IFindUserByUniqueValues {
    username: string;
    name: string;
}