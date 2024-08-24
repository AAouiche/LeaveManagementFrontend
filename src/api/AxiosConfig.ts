import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';


axios.defaults.baseURL = 'https://localhost:44301/api';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


axios.interceptors.response.use(
    async (response) => {
        await delay(500);
        return response;
    },
    (error: AxiosError) => {
        console.error("Error object:", error);

        if (error.response) {
            console.error("Server Error:", error.response.data);
            const response = error.response as AxiosResponse;

            switch (response.status) {
                case 400:
                    if (response.data.stackTrace) {
                        const modalStateErrors = response.data.stackTrace.split(',');
                        console.log(modalStateErrors);
                        toast.error(modalStateErrors.join(' '));
                        throw modalStateErrors.flat();
                    } else {
                        console.error('Error 400 without stackTrace:', response.data);
                        toast.error(response.data.message || 'Bad Request');
                        throw new Error('Error 400 without stackTrace');
                    }
                case 401:
                    toast.error("You're not authorized to access this resource or perform this operation.");
                    break;
                case 403:
                    toast.warn("Forbidden. You don’t have permission to perform this operation.");
                    break;
                case 404:
                    toast.error("Resource not found.");
                    break;
                case 500:
                    toast.error("A server error occurred. Please try again later.");
                    break;
                default:
                    toast.error("An unexpected error occurred.");
            }
        } else {
            console.error("Error Message:", error.message);
            toast.error("An error occurred.");
        }

        return Promise.reject(error);
    }
);

export default axios;