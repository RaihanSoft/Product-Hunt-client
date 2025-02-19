import { Heart, Tag } from "lucide-react";

const recommendedProducts = [
  {
    name: "DevOps Toolkit",
    description: "A comprehensive set of tools to improve your DevOps workflows.",
    image: "https://source.unsplash.com/400x300/?devops,tools",
    category: "Developer Tools",
  },
  {
    name: "TimeTracker Pro",
    description: "Track your time and optimize productivity with this smart app.",
    image: "https://source.unsplash.com/400x300/?productivity,clock",
    category: "Productivity",
  },
  {
    name: "AI-Powered Chatbot",
    description: "An intelligent chatbot that helps automate customer service.",
    image: "https://source.unsplash.com/400x300/?chatbot,ai",
    category: "AI & Machine Learning",
  },
];

const ProductRecommendations = () => {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">💡 Product Recommendations</h2>
        <p className="mt-2 text-lg text-gray-600">Based on your interests, we recommend these products!</p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-1 gap-6 max-w-5xl mx-auto">
        {recommendedProducts.map((product, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="mt-2 text-gray-700 flex justify-center items-center">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="ml-1 text-gray-500">{product.category}</span>
            </div>
            <div className="mt-4 flex justify-center items-center text-red-500">
              <Heart className="w-5 h-5" />
              <span className="ml-2 font-semibold">Loved by users!</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
