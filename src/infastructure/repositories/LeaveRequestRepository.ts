import prisma from "../../config/db.config";
import { LeaveRequest } from "../../domain/entity/Leave";
import { LeaveRequestInterface } from "../../domain/interfaces/CreateLeaveRequest";
import calculateDaysBetweenDates from "../../helpers/calculatedays";

class LeaveRequestRepository implements LeaveRequestInterface{
    async findAll(): Promise<LeaveRequest[]> {
        try {
            const LeaveData = await prisma.leaveRequest.findMany({
                include:{
                    user:true
                }
            });
            return LeaveData;
        } catch (error) {
            console.error('Error fetching leads by ID:', error);
            throw new Error('Error fetching leads');
        }
    }
    async UpdateStatus(Id: number, data: any): Promise<any> {
        try {
            const LeaveData = await prisma.leaveRequest.update({
                where: {
                    leave_request_id: Id
                },
                data:{
                    status:data
                }
            });
            
            return LeaveData;
        } catch (error) {
            console.error('Error fetching leads by ID:', error);
            throw new Error('Error fetching leads');
        }
        
    }
    

    async CreateLeave(Data:LeaveRequest): Promise<LeaveRequest> {
        const LeaveData = await prisma.leaveRequest.create({
            data: {
                ...Data,
                leave_days:calculateDaysBetweenDates(Data.start_date,Data.end_date)
            }
          });
          console.log("leaveData")
          return LeaveData;
    }

}

export default LeaveRequestRepository