import { useContext, useState } from "react";
import { Context } from "../Components/Provider/Provider";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { HiEye, HiEyeOff } from "react-icons/hi";
import 'animate.css'; // Import animate.css

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleRegister, manageProfile, handleGoogleLogin } = useContext(Context);
  const navigate = useNavigate();

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
            popup: "animate__animated animate__backInRight",
            icon: "animate__animated animate__zoomIn",
            title: "animate__animated animate__fadeInDown",
            content: "animate__animated animate__lightSpeedInRight",
          },
        });
        navigate("/");
        window.scrollTo(0, 0);
      });
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const image = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const conPassword = e.target.Conpassword.value;

    // Validation for photoURL length
    if (image.length > 500) {
      Swal.fire({
        title: "Invalid Photo URL",
        text: "Photo URL is too long. Please provide a shorter URL.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    if (password !== conPassword) {
      setError("Password didn't match");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    handleRegister(email, password)
      .then(() => {
        // Update profile with name and image
        manageProfile(name, image);

        Swal.fire({
          title: "Registration Successful!",
          text: `Welcome, ${name}! Your account has been created.`,
          icon: "success",
          confirmButtonText: "Proceed",
          timer: 1200,
          timerProgressBar: true,
          customClass: {
            popup: "animate__animated animate__fadeInDown",
          },
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Registration Failed",
          text: err.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="flex bg-black justify-center items-center min-h-screen">
      <div className="relative w-[450px] bg-black text-white shadow-2xl border border-gray-800 rounded-3xl p-10 animate__animated animate__zoomIn">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#c5a0d3] animate__animated animate__wobble">Register</h2>
        <p className="text-center text-gray-300 mb-8">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6 ">
            <label className="block text-sm font-semibold mb-2 text-[#e2c4f0]">Name</label>
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3  animate__animated animate__bounceInLeft animate__fast   bg-[#2c183f] text-white border border-[#4e2553] rounded-lg shadow-inner focus:ring-2 focus:ring-[#7e4c9f] focus:outline-none"
            />
          </div>
    
          {/* Photo URL */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-[#e2c4f0]">Photo URL</label>
            <input
              type="text"
              required
              name="photo"
              placeholder="Enter your photo URL"
              className="w-full animate__animated animate__bounceInRight animate__fast px-4 py-3 bg-[#2c183f] text-white border border-[#4e2553] rounded-lg shadow-inner focus:ring-2 focus:ring-[#7e4c9f] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-[#e2c4f0]">Email</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              className="w-full animate__animated animate__bounceInLeft animate__fast px-4 py-3 bg-[#2c183f] text-white border border-[#4e2553] rounded-lg shadow-inner focus:ring-2 focus:ring-[#7e4c9f] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-sm font-semibold mb-2 text-[#e2c4f0]">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              placeholder="Enter your password"
              className="w-full animate__animated animate__bounceInRight animate__fast px-4 py-3 bg-[#2c183f] text-white border border-[#4e2553] rounded-lg shadow-inner focus:ring-2 focus:ring-[#7e4c9f] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[43px] text-white"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-8 relative">
            <label className="block text-sm font-semibold mb-2 text-[#e2c4f0]">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              name="Conpassword"
              placeholder="Confirm your password"
              className="w-full animate__animated animate__bounceInLeft animate__fast px-4 py-3 bg-[#2c183f] text-white border border-[#4e2553] rounded-lg shadow-inner focus:ring-2 focus:ring-[#7e4c9f] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-[43px] text-white"
            >
              {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 mb-4">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full animate__animated animate__bounceInRight animate__slow py-3 bg-gradient-to-r from-[#9c63d7] to-[#6a3a91] text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all"
          >
            Register
          </button>
        </form>

        {/* Google Login */}

        <button
          onClick={handleGoogle}
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

        {/* Login Link */}
        <p className="mt-4 text-center text-[#e2c4f0]">
          Already have an account?{" "}
          <NavLink to="/login" className="text-[#9c63d7]">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;