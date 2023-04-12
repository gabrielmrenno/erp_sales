import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { router } from "./http/routes";
import { AppError } from "./errors/app-error";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(router);

app.get("/status", (request, response) => {
  response.send("Server is running!");
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
