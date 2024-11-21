import EmployeUsecases from "../usecases/Employeusecases";
import LeaveRequestuseCases from "../usecases/LeaveRequest";
import { InMemoryEmployeRepository } from "./repositories/EmployeRepository"
import LeaveRequestRepository from "./repositories/LeaveRequestRepository";

export default class DIcontainer{
    private static _EmployeRepository = new InMemoryEmployeRepository()
    private static _LeaveRequest = new LeaveRequestRepository()
    static getEmployeRepository(){
        return this._EmployeRepository
    }
    static getAllEmployeUsecase(){
        return new EmployeUsecases(this.getEmployeRepository());
    }
    static getLeaveRequest(){
        return this._LeaveRequest
    }
    static getAllLeaveRequestUsecase(){
        return new LeaveRequestuseCases(this.getLeaveRequest());
    }
}