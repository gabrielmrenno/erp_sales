export interface ICreateUser {
  name: string;
  username: string;
  role: string;
  password?: string;
  isAdmin?: boolean;
}

export interface IFindUserByUniqueValues {
  username?: string;
  name?: string;
}

export interface IUpdateUser {
  name?: string;
  role?: string;
  isAdmin?: boolean;
}
