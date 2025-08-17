import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({
    path: process.env.NODE_ENV === "production" ? ".env.production":".env"
});
import server from "./app";

mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGO_URL as string, {})
.then((data)=>{
    console.log("Mongodb connection succeed");
    const PORT = process.env.PORT ?? 3003;   // nullish operations 
    server.listen(PORT, function(  ){
        console.info("The server is running successfully on port:", PORT);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`)
    })
})
.catch((err)=>{
    console.log("Error on connection Mongodb", err);
    
})

