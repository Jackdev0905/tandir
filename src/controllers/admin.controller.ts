import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import {
  AdminRequest,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";
import { MemberType } from "../libs/enums/member.enum";
const adminController: T = {};

const memberService = new MemberService();

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");

    res.render("home");
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

adminController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    const result = await memberService.processLogin(req.body);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log(err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/login')</script>`
    );
  }
};

adminController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("signup");
    const newMember: MemberInput = req.body;
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    newMember.memberImage = file.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log(err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/signup')</script>`
    );
  }
};

adminController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member) res.send(`Hi ${req.session?.member.memberNick}`);
    else throw new Errors(HttpCode.BAD_REQUEST, Message.NOT_AUTHENTICATED);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

adminController.verifyAdmin = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("verifyAdmin");
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/login')</script>`
    );
  }
};

adminController.logout = async (req: Request, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log(err);
    res.send("/admin");
  }
};

adminController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const user: MemberUpdateInput = req.body;
    const result = await memberService.updateChosenUser(user);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("updateChosenUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

adminController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getAllUsers");
    const result = await memberService.getUsers();
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("getAllUsers:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default adminController;
