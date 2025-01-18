import { useContext, useState } from "react";
import { Context } from "../Components/Provider/Provider";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
    const { handleGoogleLogin, handleLogin } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Google Login Handler
    const handleGoogle = () => {
        handleGoogleLogin()
            .then(() => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Welcome back!",
                    text: "Login successful!",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: "animate__animated animate__flipInX",
                        icon: "animate__animated animate__zoomIn",
                        title: "animate__animated animate__bounceInDown",
                        content: "animate__animated animate__fadeInUp",
                    },
                });
                const from = location.state?.from || "/";
                navigate(from);
            });
    };

    // Form Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Welcome back!",
                    text: "Login successful!",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: "animate__animated animate__flipInX",
                        icon: "animate__animated animate__zoomIn",
                        title: "animate__animated animate__bounceInDown",
                        content: "animate__animated animate__fadeInUp",
                    },
                });
                const from = location.state?.from || "/";
                navigate(from);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="flex bg-black justify-center items-center min-h-screen ">
            <div className="relative w-[450px]  text-black shadow-2xl border border-gray-800 rounded-3xl p-10 animate__animated animate__zoomIn animate__fast">
                {/* Welcome Header */}
                <h2 className="text-3xl  font-bold text-center mb-4 text-[#c5a0d3] animate__animated animate__fast animate__rubberBand">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-300 mb-8 animate__animated animate__zoomIn animate__fast">
                    Sign in to continue exploring
                </p>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__fast">
                    {/* Email Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2 text-[#e2c4f0]">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 bg-[#2c183f] text-white border border-[#4e2553] rounded-lg shadow-inner focus:ring-2 focus:ring-[#7e4c9f] focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-8 relative">
                        <label className="block text-sm font-semibold mb-2 text-[#e2c4f0]">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 bg-[#2c183f] text-white border border-[#4e2553] rounded-lg shadow-inner focus:ring-2 focus:ring-[#7e4c9f] focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[44px] text-white"
                        >
                            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                        </button>
                        <div className="text-right mt-2">
                            <Link
                                to={`/forgot-password?email=${email}`}
                                className="text-sm text-[#a080ff] hover:text-[#d0b4ff] transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-400 mb-4">
                            {error.slice(error.indexOf("/") + 1, error.indexOf(")"))}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full  py-3 bg-gradient-to-r from-[#9c63d7] to-[#6a3a91] text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all animate__animated animate__bounceInRight animate__fast"
                    >
                        Login
                    </button>
                </form>

                {/* Google Login */}
                <button
                    onClick={handleGoogle}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-[#5e3051] to-[#411b3e] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center transform hover:scale-105 transition-all animate__animated animate__bounceInLeft animate__fast"
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

                {/* Registration Link */}
                <p className="text-center mt-6 text-gray-300 animate__animated animate__bounceIn animate__fast">
                    New to the website?{" "}
                    <NavLink
                        to="/register"
                        className="text-[#bfa3ff] font-semibold hover:underline"
                    >
                        Register
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;