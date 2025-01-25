import { useContext, useState } from "react";
import { Context } from "../Components/Provider/Provider";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { HiEye, HiEyeOff } from "react-icons/hi";
import 'animate.css'; // Import animate.css
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleRegister, manageProfile } = useContext(Context);
  const navigate = useNavigate();


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
      .then((result) => {

        const userInfo = {
          email: result.user.email,
          name: name
        }
        axios.post('https://product-hunt-server-green.vercel.app/users', userInfo)
          .then(res => {
            console.log(res.data);
            navigate('/');
          })
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
        <SocialLogin />

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