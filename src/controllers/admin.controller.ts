import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message }  from "../libs/Error";
import { MemberType } from "../libs/enums/member.enum";
const adminController: T = {};

const memberService = new MemberService();

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");

    res.send("Home page");
  } catch (err) {
    console.log(err);
  }
};

adminController.signup = (req: Request, res: Response) => {
  try {
    console.log("signup");
    res.send("signup page");
  } catch (err) {
    console.log(err);
  }
};

adminController.login = (req: Request, res: Response) => {
  try {
    console.log("login");
    res.send("Login page");
  } catch (err) {
    console.log(err);
  }
};

adminController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    const result = await memberService.processLogin(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err)
  }
};

adminController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const newMember: MemberInput = req.body;
    console.log("body", req.body);
    newMember.memberType = MemberType.RESTAURANT
    const result = await memberService.processSignup(newMember);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err)
    // throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
  }
};

export default adminController;
