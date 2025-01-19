import { useState, useEffect, useContext } from "react";
import { Context } from "../Provider/Provider";
import useAxiosSecure from "../../UseAxiosSecure/UseAxiosSecure";

const useModerator = () => {
    const { user } = useContext(Context);
    const axiosSecure = useAxiosSecure();

    const [isModerator, setIsModerator] = useState(null); // To store moderator status
    const [isModeratorLoading, setIsModeratorLoading] = useState(true); // To manage loading state

    useEffect(() => {
        const fetchModeratorStatus = async () => {
            if (!user?.email) {
                setIsModerator(null);
                setIsModeratorLoading(false);
                return;
            }

            try {
                console.log('Checking moderator status for:', user);
                const res = await axiosSecure.get(`/users/moderator/${user.email}`);
                setIsModerator(res.data?.moderator || false); // Default to false if no moderator key
            } catch (error) {
                console.error('Error fetching moderator status:', error);
                setIsModerator(false); // Handle error gracefully
            } finally {
                setIsModeratorLoading(false); // Stop loading after request
            }
        };

        fetchModeratorStatus();
    }, [user?.email, axiosSecure]);

    return [isModerator, isModeratorLoading];
};

export default useModerator;
