import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const API_URL = process.env.REACT_APP_API_URL;
console.log(process.env)
interface ApiCallResponse<T> {
    status?: string;
    msg?: string;
    code: number;
    data: T;
}

// 'application/json' | 'multipart/form-data'

export const callApi = async <T>(
    URL: string,
    method: string = 'get',
    data?: Record<string, any>,
    ContentType: string = 'application/json'
): Promise<ApiCallResponse<T> | undefined> => {
    try {
        const token = localStorage.getItem('token');

        const requestData: AxiosRequestConfig = {
            method,
            url: `${API_URL}/${URL}`,
            headers: {
                'Content-Type': ContentType,
                Auth: `${token}`,
            },
        };

        if (ContentType === "multipart/form-data") {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            data = formData
        }

        if (method.toLowerCase() === 'get' && data) {
            requestData.params = data;
        } else {
            requestData.data = data;
        }

        const response: AxiosResponse<ApiCallResponse<T>> = await axios(requestData);

        // console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        // throw error;
    }
};