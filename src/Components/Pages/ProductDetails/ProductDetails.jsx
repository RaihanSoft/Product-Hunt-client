import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../UseAxiosSecure/UseAxiosSecure';
import { Context } from '../../Provider/Provider';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewData, setReviewData] = useState({ description: '', rating: '' });
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productResponse = await axiosSecure.get(`/products/${id}`);
                setProduct(productResponse.data);

                const reviewsResponse = await axiosSecure.get(`/reviews?productId=${id}`);
                setReviews(reviewsResponse.data || []);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id, axiosSecure]);

    const handleUpvote = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (hasVoted) {
            alert('You have already upvoted this product.');
            return;
        }

        setProduct((prevProduct) => ({
            ...prevProduct,
            votes: [...prevProduct.votes, user.email],
        }));

        try {
            const response = await axiosSecure.post(`/products/${id}/upvote`, {
                userEmail: user.email,
            });

            if (response.data.message === 'Product upvoted successfully.') {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    voteCount: (prevProduct.voteCount || 0) + 1,
                }));
                alert('Product upvoted successfully!');
            }
        } catch (error) {
            console.error('Error upvoting product:', error);

            if (error.response?.status === 400) {
                alert('You have already upvoted this product.');
            } else if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleReport = async () => {
        try {
            const response = await axiosSecure.post(`/products/${id}/report`);
            if (response.data.message === 'Product reported successfully.') {
                alert('Product reported successfully.');
            }
        } catch (error) {
            console.error('Error reporting product:', error);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const response = await axiosSecure.post('/reviews', {
                ...reviewData,
                productId: id,
                reviewerName: user?.displayName || 'Anonymous',
                reviewerImage: user?.photoURL || '',
            });
            setReviewData({ description: '', rating: '' });
            console.log(response)

            const reviewsResponse = await axiosSecure.get(`/reviews?productId=${id}`);
            setReviews(reviewsResponse.data || []);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    const isProductOwner = user && product.ownerEmail === user.email;
    const hasVoted = user && product.votes.includes(user.email);

    return (
        <div className="w-11/12 mx-auto">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Product Details */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4 flex gap-4 items-center ">{product.name
                    }<a href={product.externalLink} target="_blank" rel="noopener noreferrer">
                            <span className='' ><FaExternalLinkAlt className='hover:text-[#684DF4]' /> </span>
                        </a>
                    </h1>
                    <p className="mb-4">{product.description}</p>
                    <div className="mb-4">Tags: {product.tags?.join(', ')}</div>
                    <div className="mb-4">Votes: {product.voteCount || 0}</div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleUpvote}
                            className={`px-4 py-2 rounded ${isProductOwner || hasVoted ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#684DF4] text-white'}`}
                            disabled={isProductOwner || hasVoted}
                        >
                            {isProductOwner
                                ? 'You cannot upvote your own product'
                                : hasVoted
                                    ? 'Already Voted'
                                    : 'Upvote'}
                        </button>
                        <button
                            onClick={handleReport}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Report
                        </button>
                    </div>
                </div>

                {/* Product Image */}
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-h-80 object-cover rounded-lg shadow-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            </motion.div>

            {/* Reviews Section */}
            <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl mb-4">Reviews ({reviews.length})</h2>
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={index}
                                className="border p-4 rounded-lg shadow-md"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center mb-2">
                                    <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full mr-2" />
                                    <p><strong>{review.reviewerName}</strong> ({review.rating}/5)</p>
                                </div>
                                <p>{review.description}</p>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet.</p>
                )}

                <h2 className="mt-8 text-2xl">Post a Review</h2>
                <form onSubmit={handleReviewSubmit} className="mt-4">
                    <textarea
                        value={reviewData.description}
                        onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                        placeholder="Write your review..."
                        required
                        className="w-full p-2 border rounded my-2"
                    ></textarea>
                    <input
                        type="number"
                        value={reviewData.rating}
                        onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                        placeholder="Rating (1-5)"
                        min="1"
                        max="5"
                        required
                        className="w-full p-2 border rounded my-2"
                    />
                    <button type="submit" className="px-4 py-2 bg-[#684DF4] text-white rounded">Submit</button>
                </form>
            </motion.div>
        </div>
    );
};

export default ProductDetails;
