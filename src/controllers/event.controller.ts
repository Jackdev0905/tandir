import { Response, Request } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/Error";
import EventService from "../models/Event.service";
import { EventInput, EventUpdateInput } from "../libs/types/event";
import { ExtendRequest } from "../libs/types/member";

const eventService = new EventService();

const eventController: T = {};

eventController.createEvent = async (req: ExtendRequest, res: Response) => {
  try {
    console.log("createEvent");
    const input:EventInput = req.body;
        if(req.file){
          input.eventImage = req.file.path.replace(/\\/, '/');
        }
    const result = await eventService.createEvent(input);

    res.send(
      `<script>alert("Sucsessful creation"); window.location.replace('/admin/event/all')</script>`
    );
  } catch (err) {
    console.log("Error, createEvent", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};
eventController.getEvents = async (req: Request, res: Response) => {
  try {

    const result = await eventService.getEvents();
    console.log("result", result);
    res.render("event", { events: result });
    //  res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, getEvents", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

eventController.getAllEvents = async (req: Request, res: Response) => {
  try {
    console.log("getEvents", req);

    const result = await eventService.getAllEvents();
    console.log("result", result);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getEvents", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

eventController.updateChosenEvent = async (req: Request, res: Response) => {
  try {
    console.log("updateEvent", req);
    const id = req.params.id;
    const result = await eventService.updateChosenEvent(id, req.body);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateEvent", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};
export default eventController;
