import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import useAxiosSecure from '../../../UseAxiosSecure/UseAxiosSecure';
import { Context } from '../../Provider/Provider';

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
            navigate('/login'); // Redirect to login if the user isn't logged in
            return;
        }

        if (hasVoted) {
            alert('You have already upvoted this product.');
            return;
        }

        // Disable the button immediately
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
                navigate('/login'); // Redirect to login if the session is expired
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
            console.log(response)
            setReviewData({ description: '', rating: '' });

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
        <div className="p-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <img src={product.image} alt={product.name} className="my-4 w-full max-h-80 object-cover" />
            <p>{product.description}</p>
            <p>
                <a href={product.externalLink} target="_blank" rel="noopener noreferrer">
                    <button className='btn'>Visit</button>
                </a>
            </p>
            <div>Tags: {product.tags?.join(', ')}</div>
            <div>Votes: {product.voteCount || 0}</div>

            <button
                onClick={handleUpvote}
                className={`px-4 py-2 rounded ${isProductOwner || hasVoted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
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
                className="px-4 py-2 bg-red-500 text-white rounded ml-2"
            >
                Report
            </button>

            <h2 className="mt-8 text-2xl">Reviews {reviews.length}</h2>
            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-md">
                            <div className="flex items-center mb-2">
                                <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full mr-2" />
                                <p><strong>{review.reviewerName}</strong> ({review.rating}/5)</p>
                            </div>
                            <p>{review.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews yet.</p>
            )}

            <h2 className="mt-8 text-2xl">Post a Review</h2>
            <form onSubmit={handleReviewSubmit}>
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
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
        </div>
    );
};

export default ProductDetails;
