import { useState, useEffect, useContext } from "react";
import { Context } from "../Provider/Provider";
import useAxiosSecure from "../../UseAxiosSecure/UseAxiosSecure";

const useAdmin = () => {
    const { user } = useContext(Context);
    const axiosSecure = useAxiosSecure();

    const [isAdmin, setIsAdmin] = useState(null); // To store admin status
    const [isAdminLoading, setIsAdminLoading] = useState(true); // To manage loading state

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (!user?.email) {
                setIsAdmin(null);
                setIsAdminLoading(false);
                return;
            }

            try {
                console.log('Checking admin status for:', user);
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                setIsAdmin(res.data?.admin || false); // Default to false if no admin key
            } catch (error) {
                console.error('Error fetching admin status:', error);
                setIsAdmin(false); // Handle error gracefully
            } finally {
                setIsAdminLoading(false); // Stop loading after request
            }
        };

        fetchAdminStatus();
    }, [user?.email, axiosSecure]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
