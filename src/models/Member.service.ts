import { HttpCode, Message } from "../libs/Error";
import MemberModel from "../schema/Member.model"
import Errors from "../libs/Error";
import { Member, MemberInput } from "../libs/types/member";

class MemberService{
    private readonly memberModel
    constructor(){
        this.memberModel = MemberModel
    }

    public async processSignup(input:MemberInput):Promise<String>{
        try {
            // const result = await this.memberModel.create(input)
            return "Done"
        } catch (err) {
            console.log("Error, signup", err);
            throw new Errors( HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG)
        }   
    }
}

export default MemberService