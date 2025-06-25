import express from "express";
import adminController from "./controllers/admin.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

const routerAdmin = express.Router();

/** MEMBER */

routerAdmin.get("/", adminController.goHome);
routerAdmin
  .get("/login", adminController.login)
  .post("/login", adminController.processLogin);
routerAdmin
  .get("/signup", adminController.signup)
  .post("/signup", adminController.processSignup);
routerAdmin.get("/check-me", adminController.checkAuthSession);

routerAdmin.get("/logout", adminController.logout);

/** Product */
routerAdmin.get(
  "/product/all",
  adminController.verifyAdmin,
  productController.getAllProducts
);
routerAdmin.post("/product/create",makeUploader("products").array("productImages", 5), productController.createNewProduct);
routerAdmin.post("/product/:id", productController.updateChosenProduct);

export default routerAdmin;
