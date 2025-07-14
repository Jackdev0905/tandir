import { Response, Request, NextFunction } from "express";
import MemberService from "../models/Member.service";
import { T } from "../libs/types/common";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Error";

const memberService = new MemberService();

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (error) {
    console.log("Error, goHome", error);
    res.redirect("/admin");
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (error) {
    console.log("Error, getSignup", error);
    res.redirect("/admin");
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (error) {
    console.log("Error, getLogin", error);
    res.redirect("/admin");
  }
};

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    console.log("newMember", newMember);

    req.session.save(function () {
      console.log("result", result);
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, processSignup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/signup')</script>`
    );
  }
};

restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    const newMember: LoginInput = req.body;

    const result = await memberService.processLogin(newMember);
    req.session.member = result;

    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, processLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/login')</script>`
    );
  }
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("Logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (error) {
    console.log("Error, logout", error);
    res.redirect("/admin");
  }
};

restaurantController.getUsers = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers()
    console.log("result", result);
    
    res.render("users", {users: result})
  } catch (error) {
    console.log("Error, getUsers", error);
    res.redirect("/admin/login");
  }
};

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log(" updateChosenUser");
    const result = await memberService.updateChosenUser(req.body)
    res.status(HttpCode.OK).json({data:result})
  } catch (err) {
    console.log("Error, updateChosenUser", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member) res.send(`Hi, ${req.session.member.memberNick}`);
    else res.send(`<script>alert("${Message.NOT_AUTHENTICATED}")</script>`);
  } catch (error) {
    console.log("Error, checkAuthSession", error);
    res.send(error);
  }
};

restaurantController.verifyRestaurant = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
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



export default restaurantController;
