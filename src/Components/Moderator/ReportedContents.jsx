import { useEffect, useState } from "react";
import useAxiosSecure from "../../UseAxiosSecure/UseAxiosSecure";
import { useNavigate } from "react-router-dom";

const ReportedContents = () => {
    const [reportedProducts, setReportedProducts] = useState([]);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReportedProducts = async () => {
            try {
                const response = await axiosSecure.get("/reported-products");
                setReportedProducts(response.data || []);
            } catch (error) {
                console.error("Error fetching reported products:", error);
            }
        };

        fetchReportedProducts();
    }, [axiosSecure]);

    const handleDelete = async (productId) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (!confirm) return;

        try {
            await axiosSecure.delete(`/products/${productId}`);
            setReportedProducts(reportedProducts.filter(product => product._id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Reported Products</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reportedProducts.length > 0 ? (
                        reportedProducts.map((product) => (
                            <tr key={product._id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => navigate(`/product/${product._id}`)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center py-4 text-gray-600">
                                No reported products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportedContents;
