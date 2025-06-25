import { ObjectId } from "mongoose";
import { Product, ProductUpdateInput } from "../libs/types/product";
import MemberModel from "../schema/Member.model";
import { ProductInput } from "../libs/types/product";
import Errors, { HttpCode, Message } from "../libs/Error";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return (await this.productModel.create(input)) as any;
    } catch (err) {
      console.log("Error, createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: ObjectId,
    input: ProductUpdateInput
  ): Promise<Product | null> {
    const result: Product | null = await this.productModel.findByIdAndUpdate(
      id,
      input,
      {
        new: true,
      }
    );
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result;
  }

  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec()
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result as any;
  }
}
export default ProductService;
