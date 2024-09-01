import axios, { AxiosResponse } from 'axios';
import { CreateLeaveAllocationDto } from '../dtos/leaveAllocationDtos/CreateLeaveAllocationDto';
import { UpdateLeaveAllocationDto } from '../dtos/leaveAllocationDtos/UpdateLeaveAllocationDto';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}, headers?: any) => axios.post(url, body, { headers }).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const LeaveAllocationService = {
    getAll: () => requests.get('/leaveAllocation/getall'),
    getDetails: (id: number) => requests.get(`/leaveAllocation/get/${id}`),

    create: (leaveAllocation: CreateLeaveAllocationDto) => requests.post('/leaveAllocation/create', leaveAllocation),
    
    update: (leaveAllocation: UpdateLeaveAllocationDto) => requests.put(`/leaveAllocation/update/${leaveAllocation.id}`, leaveAllocation),
    
    delete: (id: number) => requests.delete(`/leaveAllocation/delete/${id}`),
};

export default LeaveAllocationService;