import LeaveType from "./LeaveType";


export interface LeaveAllocation {
    id: number;
    numberOfDays: number;
    leaveType?: LeaveType;
    leaveTypeId: number;
    period: number;
    employeeId: string;
    dateCreated?: Date;
    dateModified?: Date;
}