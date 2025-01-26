import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../UseAxiosSecure/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Provider/Provider";
import { FaCommentDots, FaThumbsUp } from "react-icons/fa";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/products");
        const updatedProducts = response.data.map((product, index) => ({
          ...product,
          rank: index + 1,
          hasVoted: (product.votes || []).includes(user?.email),
        }));
        setProducts(updatedProducts || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure, user?.email]);

  const handleUpvote = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const product = products.find((p) => p._id === productId);

    setProducts(
      products.map((p) =>
        p._id === productId
          ? {
              ...p,
              voteCount: product.hasVoted ? (p.voteCount || 1) - 1 : (p.voteCount || 0) + 1,
              hasVoted: !product.hasVoted,
            }
          : p
      )
    );

    try {
      if (product.hasVoted) {
        await axiosSecure.post(`/products/${productId}/unvote`, { userEmail: user.email });
      } else {
        await axiosSecure.post(`/products/${productId}/upvote`, { userEmail: user.email });
      }
    } catch (error) {
      console.error("Error voting/unvoting product:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6  ">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">

              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3
                  className="text-lg font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-500">
                <FaCommentDots />
                <span>{product.commentCount || 0}</span>
              </div>
              <button
                onClick={() => handleUpvote(product._id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-full border transition ${
                  product.hasVoted
                    ? "bg-red-100 text-red-500 border-red-500"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              >
                <FaThumbsUp />
                <span>{product.voteCount || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
