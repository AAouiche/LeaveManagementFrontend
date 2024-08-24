import Login from '../models/accounts/Login';
import axios from './AxiosConfig';

import { AxiosResponse } from 'axios';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}, headers?: any) => axios.post(url, body, { headers }).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const UserService = {
    login: (loginCommand: Login) => requests.post('/User/login', loginCommand),
    getCurrentUser: () => requests.get('/user/me'),
    getAllUsers: () => requests.get('/user/list'),
};

export default UserService;