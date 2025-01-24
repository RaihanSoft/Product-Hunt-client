import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../UseAxiosSecure/UseAxiosSecure';
import { Link } from 'react-router-dom';
import { Context } from '../Provider/Provider';

const MyProducts = () => {
    const { user } = useContext(Context);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosSecure.get(`/myProducts?email=${user.email}`);
                console.log("API response:", response.data); // Debugging
                setProducts(response.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchProducts();
        }
    }, [user, axiosSecure]);

    const handleDelete = async (productId) => {
        const confirm = window.confirm('Are you sure you want to delete this product?');
        if (!confirm) return;

        try {
            await axiosSecure.delete(`/products/${productId}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold mb-6">My Products</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-800 font-semibold">Product Name</th>
                            <th className="px-6 py-3 text-left text-gray-800 font-semibold">Votes</th>
                            <th className="px-6 py-3 text-left text-gray-800 font-semibold">Status</th>
                            <th className="px-6 py-3 text-left text-gray-800 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-100 text-black ">
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">{product.voteCount || 0}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium">
                                            {product.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/dashboard/edit-product/${product._id}`}
                                            className="text-blue-700 hover:text-blue-900 font-semibold mr-4"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-700 hover:text-red-900 font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-600">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;
