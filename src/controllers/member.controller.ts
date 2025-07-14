import { Response, Request, NextFunction } from "express";

import { T } from "../libs/types/common";
import {
  ExtendRequest,
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors, { HttpCode, Message } from "../libs/Error";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const memberService = new MemberService();
const authService = new AuthService();

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
  try {
    res.send(" Home page");
  } catch (error) {
    console.log("Error, goHome", error);
  }
};

memberController.getSignup = (req: Request, res: Response) => {
  try {
    res.send(" signup page");
  } catch (error) {
    console.log("Error, getSignup", error);
  }
};

memberController.getLogin = (req: Request, res: Response) => {
  try {
    res.send(" Login page");
  } catch (error) {
    console.log("Error, getLogin", error);
  }
};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");

    console.log("body:", req.body);

    const newMember: MemberInput = req.body,
      result: Member = await memberService.signup(newMember),
      token = await authService.createToken(result);
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ member: result });
  } catch (err) {
    console.log("Error, signup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    // res.json(error)
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    const newMember: LoginInput = req.body,
      result = await memberService.login(newMember),
      token = await authService.createToken(result);
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (err) {
    console.log("Error, login", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    // res.json(error)
  }
};

memberController.getTopUsers = async (req: Request, res: Response) => {
  try {
    console.log("getTopUsers");
    const result = await memberService.getTopUsers()
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getTopUsers", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

memberController.getRestaurant = async (req: Request, res: Response) => {
  try {
    console.log("getRestaurant");
    const result = await memberService.getRestaurant()
    res.status(200).json(result);
  } catch (err) {
    console.log("Error, getRestaurant", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

memberController.logout = (req: ExtendRequest, res: Response) => {
  try {
    console.log("Logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });

    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("Error, logout", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

memberController.getMemberDetail = async (
  req: ExtendRequest,
  res: Response
) => {
  try {
    console.log("getMemberDetail");
    const result = await memberService.getMemberDetail(req.member);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, logout", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

memberController.updateMember = async (
  req: ExtendRequest,
  res: Response
) => {
  try {
    console.log("updateMember");
    const input:MemberUpdateInput = req.body;
    if(req.file){
      input.memberImage = req.file.path.replace(/\\/, '/');
    }

    const result = await memberService.updateMember(req.member, input);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateMember", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

memberController.verifyAuth = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) {
      req.member = await authService.checkAuth(token);
    }
    if (!req.member)
      throw new Errors(HttpCode.UNAUTHORIZIED, Message.NOT_AUTHENTICATED);
    next();
  } catch (err) {
    console.log("Error, verifyAuth", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    // res.json(error)
  }
};

memberController.retriveAuth = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) {
      req.member = await authService.checkAuth(token);
    }

    next();
  } catch (err) {
    console.log("Error, retriveAuth", err);
    next();
  }
};

export default memberController;
