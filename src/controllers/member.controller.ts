import {Request, Response} from "express"
import {T} from "../libs/types/common"
const memberController :T ={}

memberController.goHome = (req: Request, res:Response ) =>{
    try {
        res.send("Home page")
    } catch (err) {
        console.log("Error goHome",err);
        
    }
}

memberController.signup = (req: Request, res:Response ) =>{
    try {
        res.send("signup page")
    } catch (err) {
        console.log("Error signup",err);
        
    }
}

memberController.login = (req: Request, res:Response ) =>{
    try {
        res.send("Login page")
    } catch (err) {
        console.log("Error login",err);
        
    }
}

export default memberController;