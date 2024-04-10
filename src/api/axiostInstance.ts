import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'https://api.yuvasi.com/api/Panel',
});

axiosInstance.interceptors.request.use(async (config) => {
    let session;


    if (typeof window === 'undefined') {
        session = await getServerSession(authOptions);
    } else {
        session = await getSession();
    }

    if (session) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data === 'Token süresi doldu') {
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;