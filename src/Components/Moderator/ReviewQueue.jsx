import { useEffect, useState } from "react";
import useAxiosSecure from "../../UseAxiosSecure/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReviewQueue = () => {
    const [products, setProducts] = useState([]);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosSecure.get("/all-products");
                const sortedProducts = response.data.sort((a) => (a.status === "pending" ? -1 : 1));
                setProducts(sortedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [axiosSecure]);

    const updateProductStatus = async (productId, newStatus) => {
        try {
            await axiosSecure.patch(`/products/${productId}/status`, { status: newStatus });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === productId ? { ...product, status: newStatus } : product
                )
            );
        } catch (error) {
            console.error(`Error updating product status to ${newStatus}:`, error);
        }
    };

    const handleAccept = (productId) => {
        updateProductStatus(productId, "accepted");
        toast.success("accepted");
    };

    const handleReject = (productId) => {
        updateProductStatus(productId, "rejected");
        toast.error("rejected");
    };
    const handleFeature = ()=>{
        toast.success("Feature added");
    
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Review Queue</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <span
                                    className={`px-2 py-1 rounded text-white ${
                                        product.status === "pending"
                                            ? "bg-gray-500"
                                            : product.status === "accepted"
                                            ? "bg-green-500"
                                            : product.status === "rejected"
                                            ? "bg-red-500"
                                            : "bg-yellow-500"
                                    }`}
                                >
                                    {product.status}
                                </span>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    View Details
                                </button>
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={handleFeature}
                                >
                                    Make Featured
                                </button>
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => handleAccept(product._id)}
                                    disabled={product.status !== "pending"}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleReject(product._id)}
                                    disabled={product.status !== "pending"}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewQueue;
