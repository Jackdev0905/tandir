import {Request, Response} from "express"
import {T} from "../libs/types/common"
import MemberService from '../models/Member.service';
import { MemberInput } from "../libs/types/member";
import Errors from "../libs/Error";
const memberController :T ={}
const memberService = new MemberService()

memberController.goHome = (req: Request, res:Response ) =>{
    try {
        res.send("Home page")
    } catch (err) {
        console.log("Error goHome",err);
        
    }
}

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const result = await memberService.login(req.body);
    res.json({member: result});
  } catch (err) {
    console.log(err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const newMember: MemberInput = req.body;
    const result = await memberService.signup(newMember);
    res.json({member: result});
  } catch (err) {
    console.log(err);
    res.send(err)
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    // throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
  }
};

export default memberController;