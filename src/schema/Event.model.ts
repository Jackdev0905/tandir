import mongoose, {Schema} from "mongoose";
import { EventStatus } from "../libs/enums/event.enum";

const eventSchema = new Schema({
    
    eventStatus:{
        type: String,
        enum: EventStatus,
        default: EventStatus.PAUSE
    },
    eventTitle:{
        type: String,
        index:{unique: true, sparse: true},
        required:true,
    },
    eventAuthor:{
        type: String,
        required: true
    },
    eventDate:{
        type: String,
        required: true
    },
    eventLocation:{
        type: String,
        required: true
    },
    eventDesc:{
        type: String,
    },
    eventImage:{
        type: String,
    }

},
{timestamps: true}
)

export default mongoose.model("Event", eventSchema);