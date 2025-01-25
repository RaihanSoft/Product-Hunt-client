import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Components/Provider/Provider";

const axiosInstance = axios.create({
    baseURL: "https://product-hunt-server-green.vercel.app",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { handleLogOut } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                // Add any custom request logic here if needed
                return config;
            },
            (error) => {
                console.error("Error in request interceptor", error);
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                console.error("Error in response interceptor", error);

                // Check if the error is related to authentication
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.log("Redirecting to login page");

                    handleLogOut()
                    navigate("/login");

                }
                return axiosInstance;

            }
        );

        // Cleanup function to remove interceptors on unmount
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [handleLogOut, navigate]);

    return axiosInstance;
};

export default useAxiosSecure;