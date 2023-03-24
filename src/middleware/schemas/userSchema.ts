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
