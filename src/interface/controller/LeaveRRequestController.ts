import { Request,Response,NextFunction } from "express";
import { successResponse } from "../../helpers/responces";
import DIcontainer from "../../infastructure/DIcontainer";
import LeaveRequestuseCases from "../../usecases/LeaveRequest";
import { CustomError } from "../../helpers/customeerror";
import { ErrorCodes } from "../../constent/code";
import MailController from "./sendMail";
import prisma from "../../config/db.config";

class LeaveRequestController{
    private LeaveRequest = DIcontainer.getAllLeaveRequestUsecase()
    async AllRequest(req:Request,resp:Response,next?:NextFunction){
      try {
        const Employee = await this.LeaveRequest.FindAllLeads()
        successResponse(resp, 'All Entery get sucessfully.', Employee);
      } catch (error) {
        let customError: CustomError;
        customError = new CustomError('An unexpected error occurred', 500, ErrorCodes.BAD_REQUEST);
        if (next) {
          next(customError);
        } else {
          resp.status(customError.statusCode).json(customError.getDetails());
        }
      }
    }
    async CreateLeaveRequest(req:Request,resp:Response,next?:NextFunction){
        console.log("leave request is comming")
        console.log(req.body)
        //@ts-ignore
        let _id = req.user.userId
        try {
            const Employee = await this.LeaveRequest.createLeaveRequest({...req.body,user_id:_id,leave_type_id: 1})
            successResponse(resp, 'Leave request successfully sent to HR. They will review it and send an approval or rejection email.', Employee);
          } catch (error) {
            let customError: CustomError;
            customError = new CustomError('An unexpected error occurred', 500, ErrorCodes.BAD_REQUEST);
            if (next) {
              next(customError);
            } else {
              resp.status(customError.statusCode).json(customError.getDetails());
            }
          }
    }
    // async UpdateStatus(req:Request,resp:Response,next?:NextFunction){
    //     console.log("leave request is comming")
    //     console.log(req.params.id)
    //     //@ts-ignore
    //     const _id = req?.user.userId
    //     console.log("user id is comming")
    //     console.log(_id)
    //     try {
    //         const Employee = await this.LeaveRequest.updateLeadStatus(parseInt(req.params.id),req.body.status)
    //         if(Employee.status == "approved")
    //           {
    //             // try {
    //             //   const approvedLeave = await prisma.approvedLeave.create({
    //             //     data: {
    //             //       leave_request_id:Employee.leave_request_id,
    //             //       approved_by:_id,      
    //             //     },
    //             //   });
              
    //             //   console.log('Approved Leave Created:', approvedLeave);
    //             // } catch (error) {
    //             //   console.error('Error creating Approved Leave:', error);
    //             // }
    //             const totalpaidLeaves = await prisma.user.findUnique({
    //               where:{
    //                 "user_id":_id
    //               }
    //             })
    //             console.log("total leave count is here")
    //             console.log(totalpaidLeaves)
    //             if(totalpaidLeaves?.leave_balance == 0 )
    //             {
    //               successResponse(resp, 'There is a no paid leave avilable all leave is unpaid');
    //             }
    //             if(totalpaidLeaves?.leave_balance < Employee.leave_days)
    //             {

    //             }
    //           }
    //         console.log("update status sucessfully")
    //         successResponse(resp, 'Leave request successfully sent to HR. They will review it and send an approval or rejection email.', Employee);
            
    //       } catch (error) {
    //         let customError: CustomError;
    //         customError = new CustomError('An unexpected error occurred', 500, ErrorCodes.BAD_REQUEST);
    //         if (next) {
    //           next(customError);
    //         } else {
    //           resp.status(customError.statusCode).json(customError.getDetails());
    //         }
    //       }
    // }
    async UpdateStatus(req:Request,resp:Response,next?:NextFunction){
      console.log("leave request is comming")
      console.log(req.params.id)
      //@ts-ignore
      const _id = req?.user.userId
      console.log("user id is comming")
      console.log(_id)
      try {
          const Employee = await this.LeaveRequest.updateLeadStatus(parseInt(req.params.id),req.body.status)
          if(Employee.status == "approved")
            {
              // try {
              //   const approvedLeave = await prisma.approvedLeave.create({
              //     data: {
              //       leave_request_id:Employee.leave_request_id,
              //       approved_by:_id,      
              //     },
              //   });
            
              //   console.log('Approved Leave Created:', approvedLeave);
              // } catch (error) {
              //   console.error('Error creating Approved Leave:', error);
              // }
              const totalpaidLeaves = await prisma.user.findUnique({
                where:{
                  "user_id":_id
                }
              })
              console.log("total leave count is here")
              console.log(totalpaidLeaves)
              if(totalpaidLeaves?.leave_balance ?? "" > Employee.leave_days)
              {
                const totalDay = (totalpaidLeaves?.leave_balance ?? 0) - Employee.leave_days;
                const updatetotaldays = await prisma.user.update({
                  data:{
                    leave_balance:totalDay
                  },
                  where:{
                    user_id:_id
                  }
                })
                console.log("sucessfully updated")
              }
              else{
                console.log("your are not avilable any  paid leave")
              }
            }
          console.log("update status sucessfully")
          successResponse(resp, 'Leave request successfully sent to HR. They will review it and send an approval or rejection email.', Employee);
          
        } catch (error) {
          let customError: CustomError;
          customError = new CustomError('An unexpected error occurred', 500, ErrorCodes.BAD_REQUEST);
          if (next) {
            next(customError);
          } else {
            resp.status(customError.statusCode).json(customError.getDetails());
          }
        }
  }

}

export default LeaveRequestController