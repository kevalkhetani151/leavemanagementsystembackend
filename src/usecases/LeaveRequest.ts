import { LeaveRequest } from "../domain/entity/Leave";
import LeaveRequestRepository from "../infastructure/repositories/LeaveRequestRepository";

class LeaveRequestuseCases {
    constructor(private Employerepo:LeaveRequestRepository){

    }
    async createLeaveRequest(body:LeaveRequest){
        return await  this.Employerepo.CreateLeave(body)
    }
    async updateLeadStatus(id:number,body:any){
        return await this.Employerepo.UpdateStatus(id,body)
    }
    async FindAllLeads(){
        return this.Employerepo.findAll();
    }

}
export default LeaveRequestuseCases