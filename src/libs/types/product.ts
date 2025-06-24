import { ProductCollection, ProductSize } from './../enums/product.enum';
import {ObjectId} from "mongoose"
import { ProductStatus } from "../enums/product.enum";

export interface Product{
    _id: ObjectId;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productSize: ProductSize;
    productName: string;
    productPrice: number;
    productLeftCount:number;
    productVolume: number;
    productDesc?: string;
    productImages: string[];
    productViews: number;
}

export interface ProductInput{
    productStatus?: ProductStatus;
    productCollection: ProductCollection;
    productSize?: ProductSize;
    productName: string;
    productPrice: number;
    productLeftCount:number;
    productVolume?: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}

export interface ProductInquiry{
    order: string;
    page: number;
    limit:number;
    search?: string;
    productCollection?: ProductCollection;
}


export interface ProductUpdateInput{
    _id: ObjectId;
    productStatus?: ProductStatus;
    productCollection?: ProductCollection;
    productSize?: ProductSize;
    productName?: string;
    productPrice?: number;
    productLeftCount?:number;
    productVolume?: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}