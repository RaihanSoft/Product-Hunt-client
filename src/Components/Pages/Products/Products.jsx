import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../UseAxiosSecure/UseAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Provider/Provider';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { motion } from 'framer-motion'; // For animations

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosSecure.get('/products', { params: { search, page } });
                const updatedProducts = response.data.map(product => ({
                    ...product,
                    hasVoted: (product.votes || []).includes(user?.email),
                    isOwner: product.ownerEmail === user?.email
                }));
                setProducts(updatedProducts || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [axiosSecure, search, page, user?.email]);

    const handleUpvote = async (productId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        const product = products.find(p => p._id === productId);
        if (product.hasVoted) {
            alert('You have already upvoted this product.');
            return;
        }

        try {
            const response = await axiosSecure.post(`/products/${productId}/upvote`, {
                userEmail: user.email,
            });

            if (response.data.message === 'Product upvoted successfully.') {
                setProducts(products.map(product =>
                    product._id === productId
                        ? { ...product, voteCount: (product.voteCount || 0) + 1, votes: [...product.votes, user.email], hasVoted: true }
                        : product
                ));
            }
        } catch (error) {
            console.error('Error upvoting product:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleUnvote = async (productId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        const product = products.find(p => p._id === productId);
        if (!product.hasVoted) {
            alert('You have not upvoted this product.');
            return;
        }

        try {
            const response = await axiosSecure.post(`/products/${productId}/unvote`, {
                userEmail: user.email,
            });

            if (response.data.message === 'Product unvoted successfully.') {
                setProducts(products.map(product =>
                    product._id === productId
                        ? { ...product, voteCount: (product.voteCount || 0) - 1, votes: product.votes.filter(email => email !== user.email), hasVoted: false }
                        : product
                ));
            }
        } catch (error) {
            console.error('Error unvoting product:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    if (loading) {
        return <div className="text-center text-xl font-bold mt-10 animate-pulse">Loading...</div>;
    }

    return (
        <div className="  w-11/12 mx-auto text-white px-5 ">
            <h2 className="text-4xl text-[#684DF4] mt-5 font-bold mb-8 text-center text-gradient">
                Explore Our Products
            </h2>
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search by tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/2 p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
            </div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {products.map((product) => (
                    <motion.div
                        key={product._id}
                        className="bg-[#E1EAFF] text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3
                            className="text-2xl hover:text-[#684DF4]  font-bold mb-4 cursor-pointer hover:underline"
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            {product.name}
                        </h3>
                        <p className="mb-4 h-[160px] ">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => handleUpvote(product._id)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                    product.isOwner || product.hasVoted
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-[#684DF4] text-white hover:bg-[#684DE8] text-gray-900'
                                }`}
                                disabled={product.isOwner || product.hasVoted}
                            >
                                <FaThumbsUp className="inline-block mr-2" />
                                {product.isOwner
                                    ? 'Owner'
                                    : product.hasVoted
                                    ? `(${product.voteCount || 0})`
                                    : `Upvote (${product.voteCount || 0})`}
                            </button>

                            {product.hasVoted && (
                                <button
                                    onClick={() => handleUnvote(product._id)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-all duration-300"
                                >
                                    <FaThumbsDown className="inline-block mr-2" />
                                    Unvote
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <div className="flex justify-center mt-12">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-6 py-3 bg-[#684DF4] text-white rounded-lg mx-2 text-sm font-semibold"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="px-6 py-3 bg-[#684DF4] text-white rounded-lg mx-2 text-sm font-semibold"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductSection;
