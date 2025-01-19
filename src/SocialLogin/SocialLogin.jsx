import { useNavigate } from "react-router-dom";
import { Context } from "../Components/Provider/Provider";
import { useContext } from "react";
import useAxiosPublic from "../useAxiosPublic";


const SocialLogin = () => {
    const { handleGoogleLogin, } = useContext(Context);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        handleGoogleLogin()
            .then(result => {
                console.log(result);
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }

    return (
        <div className="-mt-7">
            <div className="divider"></div>
            <div>
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-[#5e3051] to-[#411b3e] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center transform hover:scale-105 transition-all animate__animated animate__bounceInLeft animate__slow"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="h-6 w-6 mr-2"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.9 0 7.1 1.6 9.3 4.1l7-7C35.2 2.5 30 0 24 0 14.5 0 6.4 5.8 2.4 14l8.4 6.5C12.4 13 17.6 9.5 24 9.5z"
                        />
                        <path
                            fill="#34A853"
                            d="M46.5 24.5c0-1.5-.1-2.9-.4-4.3H24v8.2h12.7c-.6 3-2.3 5.5-4.7 7.2l7.3 5.6c4.3-4 6.7-9.8 6.7-16.7z"
                        />
                        <path
                            fill="#4A90E2"
                            d="M9.3 28.2c-.4-1.2-.6-2.5-.6-3.7s.2-2.5.6-3.7L.9 14C0 16.3 0 19.3 0 22.5s0 6.3.9 8.5l8.4-2.8z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M24 44.5c5.8 0 10.7-2 14.2-5.4l-7.3-5.6c-2.2 1.5-4.9 2.4-7.9 2.4-6.4 0-11.6-4.6-13.4-10.7l-8.4 6.5c3.7 8.2 11.5 13.8 20.8 13.8z"
                        />
                    </svg>
                    Login with Google
                </button>



            </div>
        </div>
    );
};

export default SocialLogin;