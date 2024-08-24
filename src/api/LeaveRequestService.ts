import axios from './AxiosConfig';
import { 
    CancelLeaveRequestDto, 
    ChangeLeaveRequestApprovalDto, 
    CreateLeaveRequestDto, 
    UpdateLeaveRequestDto 
} from '../dtos/leaveRequestDtos';
import { AxiosResponse } from 'axios';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}, headers?: any) => axios.post(url, body, { headers }).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const LeaveRequestService = {
    getAll: () => requests.get('/leaveRequest/getAll'),
    getDetails: (id: number) => requests.get(`/leaveRequest/get/${id}`),
    create: (leaveRequest: CreateLeaveRequestDto) => requests.post('/leaveRequest/create', leaveRequest),
    update: (leaveRequest: UpdateLeaveRequestDto) => requests.put(`/leaveRequest/update/${leaveRequest.id}`, leaveRequest),
    delete: (id: number) => requests.delete(`/leaveRequest/delete/${id}`),
    cancel: (data: CancelLeaveRequestDto) => requests.post(`/leaveRequest/cancel/${data.id}`, data),
    changeApproval: (data: ChangeLeaveRequestApprovalDto) => requests.post(`/leaveRequest/approve/${data.id}`, data),
};

export default LeaveRequestService;