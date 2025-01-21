import { useState, useEffect } from "react";
import axios from "axios";

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [formData, setFormData] = useState({
        code: "",
        expiryDate: "",
        description: "",
        discountAmount: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [editCouponId, setEditCouponId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get("http://localhost:5000/coupons", {
                    withCredentials: true,
                });
                setCoupons(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching coupons:", error);
            }
        };

        fetchCoupons();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (editMode) {
                const response = await axios.put(`http://localhost:5000/coupons/${editCouponId}`, formData, {
                    withCredentials: true,
                });
                setCoupons((prev) =>
                    prev.map((coupon) => (coupon._id === editCouponId ? response.data : coupon))
                );
                setEditMode(false);
                setEditCouponId(null);
            } else {
                const response = await axios.post("http://localhost:5000/coupons", formData, {
                    withCredentials: true,
                });
                setCoupons((prev) => [...prev, response.data]);
                alert("Coupon added successfully!");
            }
            setFormData({
                code: "",
                expiryDate: "",
                description: "",
                discountAmount: "",
            });
        } catch (error) {
            console.error("Error adding/updating coupon:", error);
            setError("Error adding/updating coupon.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (coupon) => {
        setFormData({
            code: coupon.code,
            expiryDate: coupon.expiryDate,
            description: coupon.description,
            discountAmount: coupon.discountAmount,
        });
        setEditMode(true);
        setEditCouponId(coupon._id);
    };

    const handleDelete = async (couponId) => {
        const confirm = window.confirm("Are you sure you want to delete this coupon?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:5000/coupons/${couponId}`, {
                withCredentials: true,
            });
            setCoupons((prev) => prev.filter((coupon) => coupon._id !== couponId));
        } catch (error) {
            console.error("Error deleting coupon:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block mb-1 text-gray-600">Coupon Code</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-600">Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-600">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1 text-gray-600">Discount Amount</label>
                    <input
                        type="number"
                        name="discountAmount"
                        value={formData.discountAmount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={loading}
                >
                    {editMode ? "Update Coupon" : "Add Coupon"}
                </button>
            </form>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((coupon) => (
                    <div key={coupon._id} className="border p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">{coupon.code}</h3>
                        <p className="text-gray-600 mb-2">Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-2">{coupon.description}</p>
                        <p className="text-gray-600">Discount: ${coupon.discountAmount}</p>
                        <button
                            onClick={() => handleEdit(coupon)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(coupon._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCoupons;
