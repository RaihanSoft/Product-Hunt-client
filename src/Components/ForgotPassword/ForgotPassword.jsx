import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Provider/Provider";
import { useContext, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

const ForgotPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(Context); 

    // Get email from query parameters or context
    const queryParams = new URLSearchParams(location.search);
    const initialEmail = queryParams.get("email") || user?.email || "";

    const [email, setEmail] = useState(initialEmail);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleResetPassword = async () => {
        if (!email) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
            setError(null);

            setTimeout(() => {
                window.open("https://mail.google.com", "_blank");
                navigate("/"); 
            }, 1000);
        } catch (error) {
            setSuccess(false);
            setError(
                error.message.includes("user-not-found")
                    ? "No user found with this email."
                    : "Failed to send reset email. Try again later."
            );
        }
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-800 via-gray-900 to-black text-white">
    <div className="relative w-full max-w-md p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-2xl border border-gray-700 animate__animated animate__fadeInUp">
        {/* Decorative Elements */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-xl opacity-50 animate__animated animate__pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-indigo-500 via-blue-500 to-teal-500 rounded-full blur-xl opacity-50 animate__animated animate__pulse animate__delay-1s"></div>
        
        {/* Form Content */}
        <h2 className="text-3xl  font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-yellow-500 to-orange-500 animate__animated animate__bounceInDown mb-8">
            Reset Your Password
        </h2>
        <label className="block  text-lg font-semibold mb-3">
            Email Address
        </label>
        <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input w-full animate__animated animate__bounceInDown px-4 py-3 text-lg rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            value={email}
            onChange={handleEmailChange}
        />
        <button
            className="btn w-full mt-6 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-orange-500 hover:to-yellow-500 text-black font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 animate__animated animate__bounceInDown"
            onClick={handleResetPassword}
        >
            Reset Password
        </button>
        
        {success && (
            <p className="mt-6 text-center text-lg text-green-400 font-semibold animate__animated animate__fadeInUp">
                A reset link has been sent to your email.
            </p>
        )}
        {error && (
            <p className="mt-6 text-center text-lg text-red-400 font-semibold animate__animated animate__shakeX">
                {error}
            </p>
        )}
    </div>
</div>


    );
};

export default ForgotPassword;
