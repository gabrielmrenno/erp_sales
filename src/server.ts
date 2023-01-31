import express from "express";
import { router } from "./routes";

import "reflect-metadata";

const app = express();

app.use(express.json());

app.use(router);

app.get("/status", (request, response) => {
  response.send("Server is running!");
});

app.listen(3333, () => console.log("Server is running!"));
