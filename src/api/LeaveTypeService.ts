import axios from './AxiosConfig';
import { 
    CreateLeaveTypeDto, 
    UpdateLeaveTypeDto 
} from '../dtos/leaveTypeDtos';
import { AxiosResponse } from 'axios';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}, headers?: any) => axios.post(url, body, { headers }).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const LeaveTypeService = {
    getAll: () => requests.get('/leavetype'),
    getDetails: (id: number) => requests.get(`/leavetype/${id}`),
    create: (leaveType: CreateLeaveTypeDto) => requests.post('/leavetype/create', leaveType),
    update: (leaveType: UpdateLeaveTypeDto) => requests.put(`/leavetype/update/${leaveType.id}`, leaveType),
    delete: (id: number) => requests.delete(`/leavetype/delete/${id}`),
};

export default LeaveTypeService;