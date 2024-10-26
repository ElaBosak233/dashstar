// 提供一个方法 => api .配置了请求头, 和错误逻辑.
// 每次我们像后端发起请求就可以直接调用这个方法, 不用重复配置了.

import axios, { AxiosInstance } from "axios";
import useAuthStore from "../stores/auth";


export function api(): AxiosInstance {
    const instance = axios.create({
        baseURL: "/api",
        headers: {
            Authorization: `Bearer ${useAuthStore.getState()?.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response?.status === 401) {
                useAuthStore.getState().logout();
                location.href = "/login";
            }
            return Promise.reject(error);
        },
    );

    return instance;
}
