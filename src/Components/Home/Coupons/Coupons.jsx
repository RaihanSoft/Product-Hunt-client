import  { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("https://product-hunt-server-green.vercel.app/coupons", {
          withCredentials: true, // For auth token if required
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
    <div className="mt-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        {loading ? "Loading Coupons..." : "Valid Coupons"}
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {coupons.length > 0 ? (
        <Slider {...sliderSettings}>
          {coupons.map((coupon) => (
            <motion.div
              key={coupon._id}
              className="bg-blue-100 p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-2">
                {coupon?.code}
              </h3>
              <p className="text-lg text-gray-700">
                Discount: ${coupon?.discountAmount}
              </p>
              <p className="text-sm text-gray-500">
                Expires on:{" "}
                {new Date(coupon?.expiryDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mt-2">{coupon?.description}</p>
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
