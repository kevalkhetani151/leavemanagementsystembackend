import { Router,Request,Response,NextFunction } from "express";
import EmployeeController from "../controller/EmployeController";
import LeaveRequestRepository from "../../infastructure/repositories/LeaveRequestRepository";
import LeaveRequestController from "../controller/LeaveRRequestController";
import MailController from "../controller/sendMail";
import verifyToken from "../middleware/auth";
import UpdatesLeaves from "../controller/UpdateLeaves";


const route = Router();

const Employecontroller = new EmployeeController();
const LeaveRequestcontroller = new LeaveRequestController();
const mailController = new MailController()
const countleaves = new UpdatesLeaves()

route.get("/getallemp",(req:Request,resp:Response,next:NextFunction)=>{
    resp.send(
        "first route created sucessfully"
    )

})

route.post("/signup",(req:Request,resp:Response,next:NextFunction)=>Employecontroller.CreateEmploye(req,resp,next))
route.post("/login",(req:Request,resp:Response,next:NextFunction)=>Employecontroller.Login(req,resp,next))
route.post("/LeaveRequest",verifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.CreateLeaveRequest(req,resp,next))
route.post("/sendmail",(req:Request,resp:Response,next:NextFunction)=>mailController.sendEmail(req,resp,next))
route.put("/approvedleave/:id",verifyToken,(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.UpdateStatus(req,resp,next))
route.put("/countleaves",verifyToken,(req:Request,resp:Response,next:NextFunction)=>countleaves.updateCount(req,resp,next))
route.get("/me",verifyToken,(req:Request,resp:Response,next:NextFunction)=>Employecontroller.Me(req,resp,next))
route.get("/allLeaves",(req:Request,resp:Response,next:NextFunction)=>LeaveRequestcontroller.AllRequest(req,resp,next))

export default route