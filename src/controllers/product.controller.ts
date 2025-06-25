import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Error";
import { AdminRequest } from "../libs/types/member";
import ProductService from "../models/Product.service";
import { ProductInput, ProductUpdateInput } from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";

const productController: T = {};
const productService = new ProductService();

productController.getAllProducts = async (req: AdminRequest, res: Response) => {
  try {
    console.log("getAllProducts");
    res.render("product");
  } catch (err) {
    console.log("getAllProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
    const newProduct: ProductInput = req.body;
    newProduct.productImages = req.files?.map((ele: T) =>
      ele.path.replace(/\\/g, "/")
    );
    console.log("data", newProduct);
    await productService.createNewProduct(newProduct);
    res.send(
      `<script>alert("Sucsessful creation"); window.location.replace('/admin/product/all')</script>`
    );
  } catch (err) {
    console.log("createNewProduct:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/product/all')</script>`
    );
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    const product: ProductUpdateInput = req.body;
    const id = shapeIntoMongooseObjectId(req.params?.id);
    const result = await productService.updateChosenProduct(id, product);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("updateChosenProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const result = await productService.getAllProducts();
    res.render("products", { products: result });
  } catch (err) {
    console.log("getAllProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default productController;
