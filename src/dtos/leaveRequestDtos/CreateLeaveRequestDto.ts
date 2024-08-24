export interface CreateLeaveRequestDto {
    startDate: Date;
    endDate: Date;
    leaveTypeId: number;
    requestComments?: string;
    requestingEmployeeId: string;
}