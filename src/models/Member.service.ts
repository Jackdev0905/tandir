import { HttpCode, Message } from "../libs/Error";
import MemberModel from "../schema/Member.model";
import Errors from "../libs/Error";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import bcrypt from "bcrypt";
class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }
// SPA
  public async signup(input: MemberInput): Promise<Member> {
    
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON() as any;
    } catch (err) {
      console.log("Error, signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel.findOne(
      {
        memberNick: input.memberNick,
      },
      { memberNick: 1, memberPassword: 1 }
    );

    if (!member) throw new Errors(HttpCode.BAD_REQUEST, Message.NO_MEMBER_NICK);
    const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);
    if (!isMatch) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id);
    return result as any;
  }


// SSR 
  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .exec();
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result as any;
    } catch (err) {
      console.log("Error, signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel.findOne(
      {
        memberNick: input.memberNick,
      },
      { memberNick: 1, memberPassword: 1 }
    );

    if (!member) throw new Errors(HttpCode.BAD_REQUEST, Message.NO_MEMBER_NICK);
    const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);
    if (!isMatch) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id);
    return result as any;
  }
}

export default MemberService;
