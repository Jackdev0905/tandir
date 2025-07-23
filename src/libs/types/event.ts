
import {ObjectId} from "mongoose"
import { EventStatus } from "../enums/event.enum";

export interface Event{
    _id: ObjectId;
    eventStatus:EventStatus
    eventTitle:string;
    eventAuthor:string;
    eventDate: string;
    eventLocation: string;
    eventImage?: string;
    eventDesc?: string;
    createdAt: Date;
    updatedAt: Date;

}

export interface EventInput{
    eventStatus?:EventStatus
    eventTitle:string;
    eventAuthor:string;
    eventDate: string;
    eventLocation: string;
    eventImage: string;
    eventDesc?: string;
}



export interface EventUpdateInput{
    _id: ObjectId;
    eventStatus?:EventStatus
    eventTitle?:string;
    eventAuthor?:string;
    eventDate?:Date;
    eventLocation?: string;
    eventImage?: string;
    eventDesc?: string;
}

