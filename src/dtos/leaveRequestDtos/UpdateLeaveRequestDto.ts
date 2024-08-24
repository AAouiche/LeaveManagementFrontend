export interface UpdateLeaveRequestDto {
    id: number;
    startDate?: Date;
    endDate?: Date;
    leaveTypeId?: number;
    requestComments?: string;
    cancelled?: boolean;
}