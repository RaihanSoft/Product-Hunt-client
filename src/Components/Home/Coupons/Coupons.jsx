import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedCoupon, setCopiedCoupon] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("https://product-hunt-server-green.vercel.app/coupons", {
          withCredentials: true,
        });
        setCoupons(
          response.data.filter(
            (coupon) => new Date(coupon.expiryDate) > new Date()
          )
        );
      } catch (err) {
        setError("Failed to fetch coupons. Please try again.");
        console.error("Error fetching coupons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(""), 2000);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="w-11/12 mx-auto mt-16 px-4">
      <h2 className="text-3xl text-gray-600 font-bold mb-6">
        {loading ? "Loading Coupons..." : "Valid Coupons"}
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {coupons.length > 0 ? (
        <Slider {...sliderSettings}>
          {coupons.map((coupon) => (
            <motion.div
              key={coupon._id}
              className="bg-[#E1EAFF] flex flex-col md:flex-row justify-between items-center p-6 md:p-10 rounded-lg shadow-md relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Left Side */}
              <div className="flex-1 text-left mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {coupon.discountAmount}% OFF
                  <p className="text-lg text-gray-700">on your First Subscription</p>
                </h3>
                <p className="text-lg font-bold text-gray-600">
                  Use by: {new Date(coupon.expiryDate).toLocaleDateString()}
                </p>
                <p className="text-xl font-semibold text-gray-600 mt-2 md:w-1/2 ">
                {coupon.description}
                </p>
              </div>

              {/* Right Side */}
              <div className="flex-1 text-right">
                <p className="text-xl font-bold text-gray-900">{coupon.code}</p>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="mt-4 bg-[#684DF4] text-white px-4 py-2 rounded-md text-sm"
                >
                  {copiedCoupon === coupon.code ? "Copied!" : "Copy Code"}
                </button>
              </div>

              {/* Dotted Line */}
              <div className="absolute top-0 bottom-0 left-1/2 border-dashed border-l-2 border-gray-500 hidden md:block"></div>
            </motion.div>
          ))}
        </Slider>
      ) : (
        !loading && <p className="text-center text-gray-500">No valid coupons available.</p>
      )}
    </div>
  );
};

export default Coupons;
