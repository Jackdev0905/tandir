import express from "express";
import adminController from "./controllers/admin.controller";

const routerAdmin = express.Router();

routerAdmin.get("/", adminController.goHome);
routerAdmin
  .get("/login", adminController.login)
  .post("/login", adminController.processLogin);
routerAdmin.get("/signup", adminController.signup).post("/signup", adminController.processSignup);

export default routerAdmin;
