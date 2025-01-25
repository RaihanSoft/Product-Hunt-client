import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://product-hunt-server-green.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;