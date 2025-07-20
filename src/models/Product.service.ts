import { ObjectId } from "mongoose";
import { ProductCollection } from "./../libs/enums/product.enum";
import Errors from "../libs/Error";
import {
  ProductInput,
  Product,
  ProductUpdateInput,
  ProductInquiry,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCode } from "../libs/Error";
import { Message } from "../libs/Error";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { T } from "../libs/types/common";
import { ProductStatus } from "../libs/enums/product.enum";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";

class ProductService {
  private readonly productModel;
  public viewService;
  constructor() {
    this.productModel = ProductModel;
    this.viewService = new ViewService();
  }
  /** SPA  */

  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    try {
      const match: T = { productStatus: ProductStatus.PROCESS };
      if (inquiry.productCollection)
        match.productCollection = inquiry.productCollection;

      if (inquiry.search) {
        match.productName = { $regex: new RegExp(inquiry.search, "i") };
      }
      const sort: T =
        inquiry.order === "productPrice"
          ? { [inquiry.order]: 1 }
          : { [inquiry.order]: -1 };
      const result = await this.productModel
        .aggregate([
          { $match: match },
          { $sort: sort },
          { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
          { $limit: inquiry.limit * 1 },
        ])
        .exec();
      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
      return result;
    } catch (err) {
      console.log("error: createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async getProduct(
    memberId: ObjectId | null,
    id: string
  ): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);
    let result = await this.productModel
      .findOne({ _id: productId, productStatus: ProductStatus.PROCESS })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    if (memberId) {
      // check existance
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: productId,
        viewGroup: ViewGroup.PRODUCT,
      };
      const existView = await this.viewService.checkViewExistance(input);
      // insert view
      if (!existView) {
        console.log("PLANNING TO INSERT VIEW");
        await this.viewService.insertMemberView(input);

        // increase view
        result = await this.productModel
          .findByIdAndUpdate(
            productId,
            { $inc: { productViews: +1 } },
            { new: true }
          )
          .exec();
      }
    }

    return result?.toObject() as Product;
  }

  /** SSR  */
  public async getAllProducts(): Promise<Product[]> {
    try {
      const result = await this.productModel.find().exec();
      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
      return result as any;
    } catch (err) {
      console.log("error: createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return (await this.productModel.create(input)).toObject();
    } catch (err) {
      console.log("error: createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: any
  ): Promise<Product> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findByIdAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result.toObject();
  }
}

export default ProductService;
