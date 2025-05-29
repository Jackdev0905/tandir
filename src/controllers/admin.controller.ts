import {Request, Response} from "express"
import {T} from "../libs/types/common"
const adminController :T ={}

adminController.goHome = (req: Request, res:Response ) =>{
    try {
        res.send("Home page")
    } catch (err) {
        console.log(err);
        
    }
}

adminController.signup = (req: Request, res:Response ) =>{
    try {
        res.send("signup page")
    } catch (err) {
        console.log(err);
        
    }
}

adminController.login = (req: Request, res:Response ) =>{
    try {
        res.send("Login page")
    } catch (err) {
        console.log(err);
        
    }
}

export default adminController;