import { useNavigate } from "react-router-dom";
import gif from '../../assets/404.webp'

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div>
        <img src={gif} alt="" className="h-56" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={handleBackToHome}
        className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Back to Home
      </button>


    </div>
  );
};

export default ErrorPage;
