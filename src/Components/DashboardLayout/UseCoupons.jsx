import { useContext, useEffect, useState } from "react";
import { Context } from "../Provider/Provider";
import axios from "axios";

const UseCoupons = () => {
    const { setprice, price } = useContext(Context); // Access context values
    const [coupons, setCoupons] = useState([]);
    const [couponCode, setCouponCode] = useState(""); // To track the inputted coupon code
    const [error, setError] = useState(""); // To display errors
    const [success, setSuccess] = useState(""); // To display success messages
    const [loading, setLoading] = useState(false); // To manage loading state
    const [isCouponApplied, setIsCouponApplied] = useState(false); // Track if a coupon is applied

    // Fetch available coupons from the database
    useEffect(() => {
        const fetchCoupons = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get("http://localhost:5000/coupons", {
                    withCredentials: true, // For auth token if required
                });
                setCoupons(
                    response.data.filter(
                        (coupon) => new Date(coupon.expiryDate) > new Date() // Only include non-expired coupons
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

    // Handle applying a coupon
    const applyCoupon = () => {
        const matchedCoupon = coupons.find((coupon) => coupon.code === couponCode);

        if (matchedCoupon) {
            const newPrice = price - Number(matchedCoupon.discountAmount);
            setprice(newPrice); // Update price in the context
            setSuccess(`Coupon applied! You saved $${matchedCoupon.discountAmount}.`);
            setError("");
            setIsCouponApplied(true); // Disable the button after applying the coupon
        } else {
            setError("Invalid or expired coupon code.");
            setSuccess("");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Apply Coupon Code</h1>

            {loading && <p>Loading coupons...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                    disabled={isCouponApplied} // Disable input if coupon is applied
                />
                <button
                    onClick={applyCoupon}
                    className={`btn px-4 py-2 rounded ${
                        isCouponApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
                    }`}
                    disabled={isCouponApplied} // Disable button if coupon is applied
                >
                    {isCouponApplied ? "Coupon Applied" : "Use Coupon"}
                </button>
            </div>

            <p className="mt-4">Current Price: <span className="font-bold">${price.toFixed(2)}</span></p>
        </div>
    );
};

export default UseCoupons;
