import { checkSchema } from "express-validator";
import { AppError } from "../../errors/app-error";

export const loginSchema = checkSchema({
  authorization: {
    in: ["headers"],
    isString: true,
    errorMessage: "Authorization header is required",
    notEmpty: true,
    custom: {
      options: (value: string) => {
        const encoded = value.replace("Basic ", "");
        const decode = Buffer.from(encoded, "base64").toString("utf-8");
        const [username, password] = decode.split(":");

        if (!username || !password) {
          throw new AppError("Username and password are required");
        }

        return true;
      },
    },
  },
});
