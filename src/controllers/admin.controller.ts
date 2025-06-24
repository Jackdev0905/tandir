import {Request, Response} from "express"
import {T} from "../libs/types/common"
const adminController :T ={}

adminController.goHome = (req: Request, res:Response ) =>{
    try {
        console.log("goHome");
        
        res.send("Home page")
    } catch (err) {
        console.log(err);
        
    }
}

adminController.signup = (req: Request, res:Response ) =>{
    try {
        console.log("signup");
        res.send("signup page")
    } catch (err) {
        console.log(err);
        
    }
}

adminController.login = (req: Request, res:Response ) =>{
    try {
        console.log("login");
        res.send("Login page")
    } catch (err) {
        console.log(err);
        
    }
}

adminController.processLogin = (req: Request, res:Response ) =>{
    try {
        console.log("processLogin");
        res.send("processLogin page")
    } catch (err) {
        console.log(err);
        
    }
}

adminController.processSignup = (req: Request, res:Response ) =>{
    try {
        console.log("signup");
        res.send("signup page")
    } catch (err) {
        console.log(err);
        
    }
}

export default adminController;