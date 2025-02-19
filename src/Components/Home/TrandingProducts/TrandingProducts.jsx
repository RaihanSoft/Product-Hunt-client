import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../UseAxiosSecure/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Provider/Provider";
import { FaThumbsUp } from "react-icons/fa";
import { motion } from "framer-motion";

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
          isOwner: product.ownerEmail === user?.email,
        }));

        // Sort by vote count (descending order)
        updatedProducts.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));

        setProducts(updatedProducts);
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

    // Optimistic update
    setProducts(
      products.map((p) =>
        p._id === productId
          ? {
              ...p,
              voteCount: product.hasVoted ? (p.voteCount || 1) - 1 : (p.voteCount || 0) + 1,
              hasVoted: !product.hasVoted,
            }
          : p
      ).sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0)) // Re-sort after updating
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
    <div className="w-11/12 mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-6">Trending Products</h2>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            {/* Rank and Image */}
            <div className="flex items-center gap-4">

              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                {/* Product Name and Description */}
                <h3
                  className="text-lg font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-sm">{product.description}</p>
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

            {/* Vote Button */}
            <div className="flex items-center gap-4">
              {product.isOwner ? (
                <span className="text-sm text-gray-500 italic">Owner</span>
              ) : (
                <button
                  onClick={() => handleUpvote(product._id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full border transition ${
                    product.hasVoted
                      ? "bg-purple-100 text-[#684DF4] border-[#684DF4]"
                      : "bg-gray-100 text-gray-500 border-gray-300"
                  }`}
                >
                  <FaThumbsUp />
                  <span>{product.voteCount || 0}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Footer Button */}
      <div className="flex justify-center mt-6">
        <motion.button
                    whileHover={{
                      scale: 1.02, // Slightly enlarge the button on hover
                      boxShadow: "0px 10px 20px rgba(104, 77, 244, 0.3)", // Add a soft shadow on hover
                    }}
                    whileTap={{
                      scale: 0.95, // Slightly shrink the button when tapped
                    }}
                    className="bg-[#684DF4] text-white px-2 md:px-4 py-2 rounded-lg text-sm font-semibold"
                    onClick={() => navigate("/products")}
                  >
                     Show All Products
                  </motion.button>
      </div>
    </div>
  );
};

export default ProductSection;
