import LeaveType from "./LeaveType";


export default interface LeaveRequest {
    id: number; 
    startDate: Date;
    endDate: Date;
    leaveType?: LeaveType;  
    leaveTypeId: number;  
    dateRequested: Date;
    requestComments?: string; 
    approved?: boolean; 
    cancelled: boolean;
    requestingEmployeeId: string;
    dateCreated?: Date;  
    dateModified?: Date;  
}