export interface LeaveRequest {
    user_id: number;          
    leave_type_id: number;    
    start_date: Date;         
    end_date: Date;           
    leave_days: number;       
    status: string;           
    reason: string | null;          
    created_at: Date;         
    isUnpaid: boolean;        
  }
  