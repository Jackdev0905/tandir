import {ObjectId} from "mongoose"
import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";

export interface OrderItem{
    _id: ObjectId;
    itemPrice: number;
    itemQuantity: number;
    productId: ObjectId;
    orderId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItemInput{
    itemPrice: number;
    itemQuantity: number;
    productId: ObjectId;
    orderId?: ObjectId;
}

export interface Order{
    _id: ObjectId;
    orderTotal:number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId:ObjectId;
    createdAt: Date;
    updatedAt: Date;
// order aggregation
    orderItems:OrderItem[];
    productData:Product[]
}

export interface OrderInquiry{
    page:number;
    limit:number;
    orderStatus:OrderStatus
}

export interface OrderUpdateInput{
    orderId:string;
    orderStatus: OrderStatus;
}