import express from "express";
import cors from "cors";
import {database} from "./database/dbConfig.js";
import { baseError } from "./modules/errorHandling.js";
import route from "./modules/routes.js";
const app = express();

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/", route);

app.use((req, res, next) => {
  next(new baseError("page not found", 404, null, false));
});

app.use((error, req, res, next) => {
  if (error) {
    res.status(error.status).send({
      data: error.data,
      message: error.message,
      status: error.status,
      success: error.success,
    });
  }
});

app.listen(5000, () => {
  console.log("It's running at http://127.0.0.1:5000");
});
