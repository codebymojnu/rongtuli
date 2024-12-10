import { useEffect } from "react";
import api from "../api";
import useAuth from './useAuth';


const useAxios = () => {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                const authToken = auth?.authToken;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const response = await api.post("/auth/refresh-token", {
                            refreshToken: auth?.refreshToken,
                        });

                        const { token } = response.data;
                        setAuth({ ...auth, authToken: token });

                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        };
    }, [auth?.authToken]);

    return { api };
};

export default useAxios;