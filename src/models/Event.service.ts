import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import eventModel from "../schema/Member.model";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Error";
import bcrypt from "bcrypt";
import { shapeIntoMongooseObjectId } from "../libs/config";
import EventModel from "../schema/Event.model";
import { Event, EventInput, EventUpdateInput } from "../libs/types/event";
import { EventStatus } from "../libs/enums/event.enum";

class EventService {
  private readonly eventModel;
  constructor() {
    this.eventModel = EventModel;
  }

  public async createEvent(input: EventInput): Promise<Event> {
    try {
      return (await this.eventModel.create(input)).toObject();
    } catch (err) {
      console.log("error: createNewEvent", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async getEvents(): Promise<Event[]> {
    const result = await this.eventModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result as any;
  }

  public async getAllEvents(): Promise<Event[]> {
    const result = await this.eventModel
      .find({ eventStatus: EventStatus.PROCESS })
      .sort({ createdAt: -1 })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result as any;
  }

  public async updateChosenEvent(
    id: string,
    input: EventUpdateInput
  ): Promise<Event> {
    input._id = shapeIntoMongooseObjectId(id);
    const result = await this.eventModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result.toObject() as Event;
  }
}

export default EventService;
