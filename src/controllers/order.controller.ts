import { ExtendRequest } from "./../libs/types/member";
import { Response, Request, NextFunction } from "express";

import { T } from "../libs/types/common";
import OrderService from "../models/Order.service";
import Errors, { HttpCode } from "../libs/Error";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";

const orderService = new OrderService();

const orderController: T = {};

orderController.createOrder = async (req: ExtendRequest, res: Response) => {
  try {
    console.log("createOrder");
    const result = await orderService.createOrder(req.member, req.body);

    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, createOrder", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};
orderController.getMyOrders = async (req: ExtendRequest, res: Response) => {
  try {
    console.log("getMyOrders", req);
    const { page, limit, orderStatus } = req.query;
    const inquiry: OrderInquiry = {
      page: Number(page),
      limit: Number(limit),
      orderStatus: orderStatus as OrderStatus,
    };
    // console.log("member", req?.member);

    const result = await orderService.getMyOrders(req.member, inquiry);
    console.log("resukt", result);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getMyOrders", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

orderController.updateOrder = async (req: ExtendRequest, res: Response) => {
  try {
    console.log("updateOrder", req);
    const input: OrderUpdateInput = req.body;
    console.log(input);

    const result = await orderService.updateOrder(req.member, input);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateOrder", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};
export default orderController;
