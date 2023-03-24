import { checkSchema } from "express-validator";

export const createUserSchema = checkSchema({
  name: {
    in: ["body"],
    isString: true,
    errorMessage: "Name is required",
    notEmpty: true,
  },
  username: {
    in: ["body"],
    isString: true,
    errorMessage: "Username is required",
    notEmpty: true,
  },
  role: {
    in: ["body"],
    isString: true,
    matches: {
      options: [/\b(?:ADMIN|SELLER)\b/],
      errorMessage: "Role must be ADMIN or SELLER",
    },
    errorMessage: "Role is required",
    notEmpty: true,
  },
});

export const deleteUserSchema = checkSchema({
  id: {
    in: ["params"],
    isString: true,
    errorMessage: "Id is required",
    notEmpty: true,
  },
});

export const updateUserSchema = checkSchema({
  id: {
    in: ["params"],
    isString: true,
    errorMessage: "Id is required",
    notEmpty: true,
  },
  name: {
    in: ["body"],
    isString: true,
    optional: true,
  },
  role: {
    in: ["body"],
    isString: true,
    matches: {
      options: [/\b(?:ADMIN|SELLER)\b/],
      errorMessage: "Role must be ADMIN or SELLER",
    },
    optional: true,
  },
});

export const getUserSchema = checkSchema({
  id: {
    in: ["params"],
    isString: true,
    errorMessage: "Id is required",
    notEmpty: true,
  },
});

export const getUsersSchema = checkSchema({
  active: {
    in: ["query"],
    isString: true,
    matches: {
      options: [/\b(?:true|false)\b/],
      errorMessage: "Active must be true or false",
    },
    optional: true,
  },
});

export const resetPasswordSchema = checkSchema({
  id: {
    in: ["params"],
    isString: true,
    errorMessage: "Id is required",
    notEmpty: true,
  },
});

export const updateUserPasswordSchema = checkSchema({
  id: {
    in: ["params"],
    isString: true,
    errorMessage: "Id is required",
    notEmpty: true,
  },
  password: {
    in: ["body"],
    isString: true,
    errorMessage: "Password is required",
    notEmpty: true,
  },
});

export const turnAdminSchema = checkSchema({
  id: {
    in: ["params"],
    isString: true,
    errorMessage: "Id is required",
    notEmpty: true,
  },
});
