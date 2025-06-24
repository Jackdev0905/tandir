import {Request} from "express"
import { Session } from 'express-session';
import { MemberStatus, MemberType } from "../enums/member.enum";
import {ObjectId} from "mongoose"

export interface Member{
    _id: ObjectId;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick:string;
    memberPhone:string;
    memberPassword?:string;
    memberAddress?: string;
    memberImage?: string;
    memberDesc?: string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;

}

export interface MemberInput{
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick:string;
    memberPhone:string;
    memberPassword:string;
    memberAddress?: string;
    memberImage: string;
    memberDesc?: string;
    memberPoints?: number;
}

export interface LoginInput {
    memberNick: string;
    memberPassword: string;
}

export interface AdminRequest extends Request{
    member: Member;
    session: Session & {member: Member};
    file: Express.Multer.File;
    files: Express.Multer.File[];
}   

export interface MemberUpdateInput{
    _id:ObjectId;
    memberStatus?: MemberStatus;
    memberNick?:string;
    memberPhone?:string;
    memberPassword?:string;
    memberAddress?: string;
    memberImage?: string;
    memberDesc?: string;
}

export interface ExtendRequest extends Request{
    member: Member;
    file: Express.Multer.File;
    files: Express.Multer.File[];
}
